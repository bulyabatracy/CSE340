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

// For the project details page
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

export { getAllProjects, getProjectDetails };