import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Static middleware: serves /css and /images from public/
app.use(express.static(path.join(__dirname, 'public')));

// View engine: EJS, views in src/views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// ---- Route handlers (named const arrow functions, async) ----

const getHomePage = async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
};

const getOrganizationsPage = async (req, res) => {
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
};

const getProjectsPage = async (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
};

const getCategoriesPage = async (req, res) => {
    const title = 'Service Project Categories';
    const categories = [
        'Environmental',
        'Educational',
        'Community Service',
        'Health and Wellness'
    ];
    res.render('categories', { title, categories });
};

// ---- Routes ----

app.get('/', getHomePage);
app.get('/organizations', getOrganizationsPage);
app.get('/projects', getProjectsPage);
app.get('/categories', getCategoriesPage);

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});