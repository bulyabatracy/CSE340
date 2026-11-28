import db from './src/database/index.js';

try {
    await db.query('BEGIN');

    const projectResult = await db.query(
        "SELECT project_id FROM project WHERE lower(name) = lower($1)",
        ['Grading']
    );
    for (const project of projectResult.rows) {
        await db.query('DELETE FROM project_category WHERE project_id = $1', [project.project_id]);
    }

    const categoryResult = await db.query(
        "SELECT category_id FROM category WHERE lower(name) = lower($1)",
        ['Grading']
    );
    for (const category of categoryResult.rows) {
        await db.query('DELETE FROM project_category WHERE category_id = $1', [category.category_id]);
    }

    await db.query("DELETE FROM project WHERE lower(name) = lower($1)", ['Grading']);
    await db.query("DELETE FROM category WHERE lower(name) = lower($1)", ['Grading']);

    const organizationResult = await db.query(
        "SELECT organization_id FROM organization WHERE lower(name) = lower($1)",
        ['Grading']
    );
    for (const organization of organizationResult.rows) {
        await db.query('DELETE FROM project WHERE organization_id = $1', [organization.organization_id]);
    }
    await db.query("DELETE FROM organization WHERE lower(name) = lower($1)", ['Grading']);

    await db.query('COMMIT');

    const remaining = await db.query(`
        SELECT 'organization' AS kind, organization_id AS id, name
        FROM organization WHERE lower(name) = lower('Grading')
        UNION ALL
        SELECT 'category', category_id, name
        FROM category WHERE lower(name) = lower('Grading')
        UNION ALL
        SELECT 'project', project_id, name
        FROM project WHERE lower(name) = lower('Grading')
    `);

    console.log(`Deleted test Grading records. Remaining matches: ${remaining.rowCount}`);
} catch (error) {
    await db.query('ROLLBACK');
    console.error(error);
    process.exitCode = 1;
} finally {
    await db.end();
}
