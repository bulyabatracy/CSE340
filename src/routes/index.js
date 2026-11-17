import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
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

router.get('/categories', asyncHandler(showCategoriesPage));
router.get('/categories/new-category', asyncHandler(showNewCategoryForm));
router.post('/categories/new-category', asyncHandler(processNewCategory));
router.get('/categories/edit-category/:id', asyncHandler(showEditCategoryForm));
router.post('/categories/edit-category/:id', asyncHandler(processEditCategory));
router.get('/categories/:id', asyncHandler(showCategoryDetailsPage));

router.get('/organizations', asyncHandler(showOrganizationsPage));
router.get('/organizations/new-organization', asyncHandler(showNewOrganizationForm));
router.post('/organizations/new-organization', asyncHandler(processNewOrganization));
router.get('/organizations/edit-organization/:id', asyncHandler(showEditOrganizationForm));
router.post('/organizations/edit-organization/:id', asyncHandler(processEditOrganization));
router.get('/organizations/:id', asyncHandler(showOrganizationDetailsPage));

router.get('/projects', asyncHandler(getProjectsPage));
router.get('/projects/new-project', asyncHandler(showNewProjectForm));
router.post('/projects/new-project', asyncHandler(processNewProject));
router.get('/projects/edit-project/:id', asyncHandler(showEditProjectForm));
router.post('/projects/edit-project/:id', asyncHandler(processEditProject));
router.get('/projects/:id/assign-categories', asyncHandler(showAssignCategoryForm));
router.post('/projects/:id/assign-categories', asyncHandler(processAssignCategoryForm));
router.get('/projects/:id', asyncHandler(showProjectDetailsPage));

export default router;