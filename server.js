import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 1. Import Session and Flash
import session from 'express-session';
import flash from 'connect-flash';

// Import the Router
import routes from './src/routes/index.js';
import { ensureUsersTableAndAdmin } from './src/models/users.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

if (NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Static files and View engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Body Parser (Required to read POST form data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Session and Flash Setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'development-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));
app.use(flash());

// 4. Pass session and flash messages to all EJS views
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    res.locals.currentUser = req.session.user || null;
    next();
});

// Home Route
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Use Routes
app.use('/', routes);

// 404 Error Handler (Must be at the bottom, after all routes)
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// 500 Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Server Error' });
});

const startServer = async () => {
    try {
        await ensureUsersTableAndAdmin();
        app.listen(PORT, () => {
            console.log(`Server is running at http://127.0.0.1:${PORT}`);
            console.log(`Environment: ${NODE_ENV}`);
        });
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
};

startServer();