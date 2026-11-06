import { getAllOrganizations, getOrganizationDetails, getProjectsByOrganizationId } from '../models/organizations.js';

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

export { showOrganizationsPage, showOrganizationDetailsPage };