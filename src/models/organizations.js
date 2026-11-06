import db from '../database/index.js';

const getAllOrganizations = async () => {
    const query = 'SELECT organization_id, name, description, logo_filename FROM organization';
    const result = await db.query(query);
    return result.rows;
};

// For the organization details page
const getOrganizationDetails = async (orgId) => {
    const query = 'SELECT * FROM organization WHERE organization_id = $1';
    const result = await db.query(query, [orgId]);
    return result.rows[0];
};

// For listing projects hosted by an organization
const getProjectsByOrganizationId = async (orgId) => {
    const query = 'SELECT project_id, name FROM project WHERE organization_id = $1';
    const result = await db.query(query, [orgId]);
    return result.rows;
};

export { getAllOrganizations, getOrganizationDetails, getProjectsByOrganizationId };