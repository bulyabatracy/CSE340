import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import the Routers (We will create these in the next steps)
import projectRoutes from './src/routes/projects.js';
import categoryRoutes from './src/routes/categories.js';
import organizationRoutes from './src/routes/organizations.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Static files and View engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home Route (This can stay here)
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Use Routers
app.use('/projects', projectRoutes);
app.use('/categories', categoryRoutes);
app.use('/organizations', organizationRoutes);

// 404 Error Handler (Must be at the bottom, after all routes)
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// 500 Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});