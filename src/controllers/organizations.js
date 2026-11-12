import { 
    getAllOrganizations, 
    getOrganizationDetails, 
    getProjectsByOrganizationId,
    createOrganization,
    updateOrganization
} from '../models/organizations.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Organizations', organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const orgId = req.params.id;
    const organization = await getOrganizationDetails(orgId);

    if (!organization) {
        return res.status(404).render('404', { title: 'Organization Not Found' });
    }

    const projects = await getProjectsByOrganizationId(orgId);
    res.render('organization', { title: organization.name, organization, projects });
};

// --- NEW FOR W04 ---

const showNewOrganizationForm = async (req, res) => {
    res.render('new-organization', { title: 'New Organization', org: {} });
};

const processNewOrganization = async (req, res) => {
    const { name, description, contact_email, logo_filename } = req.body;
    const errors = [];

    // Server-side validation
    if (!name || name.length < 3 || name.length > 100) errors.push('Name must be between 3 and 100 characters.');
    if (!description) errors.push('Description is required.');
    if (!contact_email) errors.push('Contact email is required.');
    if (!logo_filename) errors.push('Logo filename is required.');

    if (errors.length > 0) {
        return res.render('new-organization', { title: 'New Organization', errors, org: req.body });
    }

    await createOrganization(name, description, contact_email, logo_filename);
    req.flash('success', 'Organization created successfully!');
    res.redirect('/organizations');
};

const showEditOrganizationForm = async (req, res) => {
    const organization = await getOrganizationDetails(req.params.id);
    if (!organization) {
        return res.status(404).render('404', { title: 'Organization Not Found' });
    }
    res.render('edit-organization', { title: 'Edit Organization', org: organization });
};

const processEditOrganization = async (req, res) => {
    const orgId = req.params.id;
    const { name, description, contact_email, logo_filename } = req.body;
    const errors = [];

    // Server-side validation
    if (!name || name.length < 3 || name.length > 100) errors.push('Name must be between 3 and 100 characters.');
    if (!description) errors.push('Description is required.');

    if (errors.length > 0) {
        return res.render('edit-organization', { 
            title: 'Edit Organization', 
            errors, 
            org: { ...req.body, organization_id: orgId } 
        });
    }

    await updateOrganization(orgId, name, description, contact_email, logo_filename);
    req.flash('success', 'Organization updated successfully!');
    res.redirect('/organizations');
};

export { 
    showOrganizationsPage, 
    showOrganizationDetailsPage, 
    showNewOrganizationForm, 
    processNewOrganization, 
    showEditOrganizationForm, 
    processEditOrganization 
};