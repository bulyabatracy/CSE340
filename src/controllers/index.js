import {
    getAllCategories, getCategoryDetails, getProjectsByCategoryId,
    createCategory, updateCategory
} from '../models/categories.js';
import {
    getAllOrganizations, getOrganizationDetails, getProjectsByOrganizationId,
    createOrganization, updateOrganization
} from '../models/organizations.js';
import {
    getAllProjects, getProjectDetails, updateProjectCategories,
    createProject, updateProject
} from '../models/projects.js';
import { getCategoriesByProjectId, getAllCategories as getAllCategoriesForProject } from '../models/categories.js';
import { getAllOrganizations as getAllOrganizationsForProject } from '../models/organizations.js';

const trimField = value => typeof value === 'string' ? value.trim() : '';
const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidDate = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Categories', categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);

    if (!category) {
        return res.status(404).render('404', { title: 'Category Not Found' });
    }

    const projects = await getProjectsByCategoryId(categoryId);
    res.render('category', { title: category.name, category, projects });
};

const showNewCategoryForm = async (req, res) => {
    res.render('new-category', { title: 'New Category', name: '' });
};

const processNewCategory = async (req, res) => {
    const name = req.body.name ? req.body.name.trim() : '';
    const errors = [];

    if (!name || name.length < 3 || name.length > 100) {
        errors.push('Category name must be between 3 and 100 characters.');
    }

    if (errors.length > 0) {
        return res.render('new-category', { title: 'New Category', errors, name });
    }

    await createCategory(name);
    req.flash('success', 'Category created successfully!');
    res.redirect('/categories');
};

const showEditCategoryForm = async (req, res) => {
    const category = await getCategoryDetails(req.params.id);
    if (!category) {
        return res.status(404).render('404', { title: 'Category Not Found' });
    }
    res.render('edit-category', { title: 'Edit Category', category });
};

const processEditCategory = async (req, res) => {
    const categoryId = req.params.id;
    const name = req.body.name ? req.body.name.trim() : '';
    const errors = [];

    if (!name || name.length < 3 || name.length > 100) {
        errors.push('Category name must be between 3 and 100 characters.');
    }

    if (errors.length > 0) {
        return res.render('edit-category', {
            title: 'Edit Category',
            errors,
            category: { category_id: categoryId, name }
        });
    }

    await updateCategory(categoryId, name);
    req.flash('success', 'Category updated successfully!');
    res.redirect('/categories');
};

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

const showNewOrganizationForm = async (req, res) => {
    res.render('new-organization', { title: 'New Organization', org: {} });
};

const processNewOrganization = async (req, res) => {
    const name = trimField(req.body.name);
    const description = trimField(req.body.description);
    const contact_email = trimField(req.body.contact_email);
    const logo_filename = trimField(req.body.logo_filename);
    const errors = [];

    if (!name || name.length < 3 || name.length > 100) errors.push('Name must be between 3 and 100 characters.');
    if (!description) errors.push('Description is required.');
    if (!isValidEmail(contact_email) || contact_email.length > 254) errors.push('Enter a valid contact email.');
    if (!logo_filename || logo_filename.length > 255) errors.push('Logo filename is required and must be 255 characters or fewer.');

    if (errors.length > 0) {
        return res.render('new-organization', { title: 'New Organization', errors, org: { name, description, contact_email, logo_filename } });
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
    const name = trimField(req.body.name);
    const description = trimField(req.body.description);
    const contact_email = trimField(req.body.contact_email);
    const logo_filename = trimField(req.body.logo_filename);
    const errors = [];

    if (!name || name.length < 3 || name.length > 100) errors.push('Name must be between 3 and 100 characters.');
    if (!description) errors.push('Description is required.');
    if (!isValidEmail(contact_email) || contact_email.length > 254) errors.push('Enter a valid contact email.');
    if (!logo_filename || logo_filename.length > 255) errors.push('Logo filename is required and must be 255 characters or fewer.');

    if (errors.length > 0) {
        return res.render('edit-organization', {
            title: 'Edit Organization',
            errors,
            org: { organization_id: orgId, name, description, contact_email, logo_filename }
        });
    }

    await updateOrganization(orgId, name, description, contact_email, logo_filename);
    req.flash('success', 'Organization updated successfully!');
    res.redirect('/organizations');
};

const getProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    res.render('projects', { title: 'Service Projects', projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
        return res.status(404).render('404', { title: 'Project Not Found' });
    }

    const categories = await getCategoriesByProjectId(projectId);
    res.render('project', { title: project.name, project, categories });
};

const showAssignCategoryForm = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) return res.status(404).render('404', { title: 'Project Not Found' });

    const categories = await getAllCategoriesForProject();
    const assignedCategories = await getCategoriesByProjectId(projectId);
    const assignedIds = assignedCategories.map(category => category.category_id);

    res.render('assign-categories', { title: 'Assign Categories', project, categories, assignedIds });
};

const processAssignCategoryForm = async (req, res) => {
    const projectId = req.params.id;
    const categoryIds = req.body.categoryIds;

    await updateProjectCategories(projectId, categoryIds);
    req.flash('success', 'Categories assigned successfully!');
    res.redirect(`/projects/${projectId}`);
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizationsForProject();
    res.render('new-project', { title: 'New Project', organizations, project: {} });
};

const processNewProject = async (req, res) => {
    const organization_id = trimField(req.body.organization_id);
    const name = trimField(req.body.name);
    const description = trimField(req.body.description);
    const project_date = trimField(req.body.project_date);
    const location = trimField(req.body.location);
    const errors = [];
    const organizations = await getAllOrganizationsForProject();

    if (!Number.isInteger(Number(organization_id)) || Number(organization_id) < 1) errors.push('Organization is required.');
    if (!name || name.length < 3 || name.length > 100) errors.push('Name must be 3-100 characters.');
    if (!description) errors.push('Description is required.');
    if (!isValidDate(project_date)) errors.push('Enter a valid project date.');
    if (!location) errors.push('Location is required.');

    if (errors.length > 0) {
        return res.render('new-project', { title: 'New Project', errors, organizations, project: { organization_id, name, description, project_date, location } });
    }

    await createProject(organization_id, name, description, project_date, location);
    req.flash('success', 'Project created successfully!');
    res.redirect('/projects');
};

const showEditProjectForm = async (req, res) => {
    const project = await getProjectDetails(req.params.id);
    const organizations = await getAllOrganizationsForProject();
    if (!project) return res.status(404).render('404', { title: 'Project Not Found' });

    if (project.project_date) {
        project.project_date = new Date(project.project_date).toISOString().split('T')[0];
    }

    res.render('edit-project', { title: 'Edit Project', organizations, project });
};

const processEditProject = async (req, res) => {
    const projectId = req.params.id;
    const organization_id = trimField(req.body.organization_id);
    const name = trimField(req.body.name);
    const description = trimField(req.body.description);
    const project_date = trimField(req.body.project_date);
    const location = trimField(req.body.location);
    const errors = [];
    const organizations = await getAllOrganizationsForProject();

    if (!Number.isInteger(Number(organization_id)) || Number(organization_id) < 1) errors.push('Organization is required.');
    if (!name || name.length < 3 || name.length > 100) errors.push('Name must be 3-100 characters.');
    if (!description) errors.push('Description is required.');
    if (!isValidDate(project_date)) errors.push('Enter a valid project date.');
    if (!location) errors.push('Location is required.');

    if (errors.length > 0) {
        return res.render('edit-project', {
            title: 'Edit Project',
            errors,
            organizations,
            project: { project_id: projectId, organization_id, name, description, project_date, location }
        });
    }

    await updateProject(projectId, organization_id, name, description, project_date, location);
    req.flash('success', 'Project updated successfully!');
    res.redirect('/projects');
};

export {
    showCategoriesPage, showCategoryDetailsPage,
    showNewCategoryForm, processNewCategory,
    showEditCategoryForm, processEditCategory,
    showOrganizationsPage, showOrganizationDetailsPage,
    showNewOrganizationForm, processNewOrganization,
    showEditOrganizationForm, processEditOrganization,
    getProjectsPage, showProjectDetailsPage,
    showAssignCategoryForm, processAssignCategoryForm,
    showNewProjectForm, processNewProject,
    showEditProjectForm, processEditProject
};