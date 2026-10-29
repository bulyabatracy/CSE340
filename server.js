import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 1. Import all three model functions
import { getAllCategories } from './src/models/categories.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const getHomePage = async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
};

// 2. Fetch organizations from the database
const getOrganizationsPage = async (req, res) => {
    const title = 'Our Partner Organizations';
    const organizations = await getAllOrganizations();
    res.render('organizations', { title, organizations });
};

// 3. Fetch projects from the database
const getProjectsPage = async (req, res) => {
    const title = 'Service Projects';
    const projects = await getAllProjects();
    res.render('projects', { title, projects });
};

const getCategoriesPage = async (req, res) => {
    const title = 'Service Project Categories';
    const categories = await getAllCategories();
    res.render('categories', { title, categories });
};

app.get('/', getHomePage);
app.get('/organizations', getOrganizationsPage);
app.get('/projects', getProjectsPage);
app.get('/categories', getCategoriesPage);

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});