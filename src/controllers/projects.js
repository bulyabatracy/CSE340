import { getAllProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

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

export { getProjectsPage, showProjectDetailsPage };