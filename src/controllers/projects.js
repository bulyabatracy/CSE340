import { 
    getAllProjects, getProjectDetails, updateProjectCategories, 
    createProject, updateProject 
} from '../models/projects.js';
import { getCategoriesByProjectId, getAllCategories } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js'; // NEW

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

    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);
    const assignedIds = assignedCategories.map(c => c.category_id);
    
    res.render('assign-categories', { title: 'Assign Categories', project, categories, assignedIds });
};

const processAssignCategoryForm = async (req, res) => {
    const projectId = req.params.id;
    const categoryIds = req.body.categoryIds;
    
    await updateProjectCategories(projectId, categoryIds);
    req.flash('success', 'Categories assigned successfully!');
    res.redirect(`/projects/${projectId}`);
};

// --- NEW FOR W04 ---

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    res.render('new-project', { title: 'New Project', organizations, project: {} });
};

const processNewProject = async (req, res) => {
    const { organization_id, name, description, project_date, location } = req.body;
    const errors = [];
    const organizations = await getAllOrganizations();

    if (!organization_id) errors.push('Organization is required.');
    if (!name || name.length < 3 || name.length > 100) errors.push('Name must be 3-100 characters.');
    if (!description) errors.push('Description is required.');
    if (!project_date) errors.push('Date is required.');
    if (!location) errors.push('Location is required.');

    if (errors.length > 0) {
        return res.render('new-project', { title: 'New Project', errors, organizations, project: req.body });
    }

    await createProject(organization_id, name, description, project_date, location);
    req.flash('success', 'Project created successfully!');
    res.redirect('/projects');
};

const showEditProjectForm = async (req, res) => {
    const project = await getProjectDetails(req.params.id);
    const organizations = await getAllOrganizations();
    if (!project) return res.status(404).render('404', { title: 'Project Not Found' });
    
    // Format date for the HTML date input (YYYY-MM-DD)
    if (project.project_date) {
        project.project_date = new Date(project.project_date).toISOString().split('T')[0];
    }
    
    res.render('edit-project', { title: 'Edit Project', organizations, project });
};

const processEditProject = async (req, res) => {
    const projectId = req.params.id;
    const { organization_id, name, description, project_date, location } = req.body;
    const errors = [];
    const organizations = await getAllOrganizations();

    if (!name || name.length < 3 || name.length > 100) errors.push('Name must be 3-100 characters.');

    if (errors.length > 0) {
        return res.render('edit-project', { title: 'Edit Project', errors, organizations, project: { ...req.body, project_id: projectId } });
    }

    await updateProject(projectId, organization_id, name, description, project_date, location);
    req.flash('success', 'Project updated successfully!');
    res.redirect('/projects');
};

export { 
    getProjectsPage, showProjectDetailsPage, showAssignCategoryForm, processAssignCategoryForm,
    showNewProjectForm, processNewProject, showEditProjectForm, processEditProject
};