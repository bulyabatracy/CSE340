import db from '../database/index.js';

const getAllProjects = async () => {
    const query = 'SELECT project_id, organization_id, name, description, project_date, location FROM project';
    const result = await db.query(query);
    return result.rows;
};

export { getAllProjects };