import db from '../database/index.js';

const getAllProjects = async () => {
    const query = `
        SELECT p.project_id, p.organization_id, p.name, p.description, p.project_date, p.location,
               o.name AS organization_name
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        ORDER BY p.project_date ASC
    `;
    const result = await db.query(query);
    return result.rows;
};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT p.*, o.name AS organization_name
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `;
    const result = await db.query(query, [projectId]);
    return result.rows[0];
};

const updateProjectCategories = async (projectId, categoryIds) => {
    await db.query('DELETE FROM project_category WHERE project_id = $1', [projectId]);
    if (categoryIds) {
        const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
        for (const catId of ids) {
            await db.query('INSERT INTO project_category (project_id, category_id) VALUES ($1, $2)', [projectId, catId]);
        }
    }
};

// --- NEW FOR W04 ---

const createProject = async (organization_id, name, description, project_date, location) => {
    const query = `
        INSERT INTO project (organization_id, name, description, project_date, location) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const result = await db.query(query, [organization_id, name, description, project_date, location]);
    return result.rows[0];
};

const updateProject = async (projectId, organization_id, name, description, project_date, location) => {
    const query = `
        UPDATE project 
        SET organization_id = $1, name = $2, description = $3, project_date = $4, location = $5 
        WHERE project_id = $6 RETURNING *
    `;
    const result = await db.query(query, [organization_id, name, description, project_date, location, projectId]);
    return result.rows[0];
};

export { 
    getAllProjects, getProjectDetails, updateProjectCategories, 
    createProject, updateProject 
};