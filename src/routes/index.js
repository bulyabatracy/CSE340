import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { requireLogin, requireRole } from '../middleware/auth.js';
import {
    showRegisterPage, processRegistration,
    showLoginPage, processLogin, processLogout,
    showDashboard, showUsersPage
} from '../controllers/auth.js';
import {
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
} from '../controllers/index.js';

const router = express.Router();

router.get('/register', showRegisterPage);
router.post('/register', asyncHandler(processRegistration));
router.get('/login', showLoginPage);
router.post('/login', asyncHandler(processLogin));
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin'), asyncHandler(showUsersPage));

router.get('/categories', asyncHandler(showCategoriesPage));
router.get('/categories/new-category', requireRole('admin'), asyncHandler(showNewCategoryForm));
router.post('/categories/new-category', requireRole('admin'), asyncHandler(processNewCategory));
router.get('/categories/edit-category/:id', requireRole('admin'), asyncHandler(showEditCategoryForm));
router.post('/categories/edit-category/:id', requireRole('admin'), asyncHandler(processEditCategory));
router.get('/categories/:id', asyncHandler(showCategoryDetailsPage));

router.get('/organizations', asyncHandler(showOrganizationsPage));
router.get('/organizations/new-organization', requireRole('admin'), asyncHandler(showNewOrganizationForm));
router.post('/organizations/new-organization', requireRole('admin'), asyncHandler(processNewOrganization));
router.get('/organizations/edit-organization/:id', requireRole('admin'), asyncHandler(showEditOrganizationForm));
router.post('/organizations/edit-organization/:id', requireRole('admin'), asyncHandler(processEditOrganization));
router.get('/organizations/:id', asyncHandler(showOrganizationDetailsPage));

router.get('/projects', asyncHandler(getProjectsPage));
router.get('/projects/new-project', requireRole('admin'), asyncHandler(showNewProjectForm));
router.post('/projects/new-project', requireRole('admin'), asyncHandler(processNewProject));
router.get('/projects/edit-project/:id', requireRole('admin'), asyncHandler(showEditProjectForm));
router.post('/projects/edit-project/:id', requireRole('admin'), asyncHandler(processEditProject));
router.get('/projects/:id/assign-categories', requireRole('admin'), asyncHandler(showAssignCategoryForm));
router.post('/projects/:id/assign-categories', requireRole('admin'), asyncHandler(processAssignCategoryForm));
router.get('/projects/:id', asyncHandler(showProjectDetailsPage));

export default router;