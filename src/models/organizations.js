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

// NEW FOR W04: Create Organization
const createOrganization = async (name, description, contact_email, logo_filename) => {
    const query = `
        INSERT INTO organization (name, description, contact_email, logo_filename) 
        VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const result = await db.query(query, [name, description, contact_email, logo_filename]);
    return result.rows[0];
};

// NEW FOR W04: Update Organization
const updateOrganization = async (orgId, name, description, contact_email, logo_filename) => {
    const query = `
        UPDATE organization 
        SET name = $1, description = $2, contact_email = $3, logo_filename = $4 
        WHERE organization_id = $5 RETURNING *
    `;
    const result = await db.query(query, [name, description, contact_email, logo_filename, orgId]);
    return result.rows[0];
};

export {
    getAllOrganizations,
    getOrganizationDetails,
    getProjectsByOrganizationId,
    createOrganization,
    updateOrganization
};