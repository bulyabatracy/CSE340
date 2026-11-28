import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { createUser, getUserByEmail, getAllUsers } from '../models/users.js';

const showRegisterPage = (req, res) => {
    res.render('register', { title: 'Register', form: {} });
};

const processRegistration = async (req, res) => {
    const firstName = req.body.firstName?.trim() || '';
    const lastName = req.body.lastName?.trim() || '';
    const email = req.body.email?.trim().toLowerCase() || '';
    const password = req.body.password || '';
    const errors = validationResult(req).array().map(error => error.msg);

    if (errors.length) {
        return res.render('register', { title: 'Register', errors, form: { firstName, lastName, email } });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.render('register', {
            title: 'Register',
            errors: ['An account already exists with that email address.'],
            form: { firstName, lastName, email }
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await createUser(firstName, lastName, email, passwordHash);
    req.flash('success', 'Registration successful. Please log in.');
    res.redirect('/login');
};

const showLoginPage = (req, res) => {
    res.render('login', { title: 'Login', email: '' });
};

const processLogin = async (req, res) => {
    const email = req.body.email?.trim().toLowerCase() || '';
    const password = req.body.password || '';
    const errors = validationResult(req).array().map(error => error.msg);

    if (errors.length) {
        return res.render('login', { title: 'Login', email, errors });
    }

    const user = await getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.render('login', {
            title: 'Login',
            email,
            errors: ['Invalid email or password.']
        });
    }

    req.session.user = {
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
    };
    req.flash('success', 'Welcome back!');
    res.redirect('/dashboard');
};

const processLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

const showDashboard = (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
};

const showUsersPage = async (req, res) => {
    const users = await getAllUsers();
    res.render('users', { title: 'Registered Users', users });
};

export {
    showRegisterPage, processRegistration,
    showLoginPage, processLogin, processLogout,
    showDashboard, showUsersPage
};
