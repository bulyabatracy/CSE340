import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import {
    getProjectsPage, showProjectDetailsPage,
    showAssignCategoryForm, processAssignCategoryForm,
    showNewProjectForm, processNewProject, showEditProjectForm, processEditProject
} from '../controllers/projects.js';

const router = express.Router();

router.get('/', asyncHandler(getProjectsPage));

// W04: Create & Edit Routes
router.get('/new-project', asyncHandler(showNewProjectForm));
router.post('/new-project', asyncHandler(processNewProject));
router.get('/edit-project/:id', asyncHandler(showEditProjectForm));
router.post('/edit-project/:id', asyncHandler(processEditProject));

// Assign Categories Routes
router.get('/:id/assign-categories', asyncHandler(showAssignCategoryForm));
router.post('/:id/assign-categories', asyncHandler(processAssignCategoryForm));

// Dynamic Route MUST be at the bottom
router.get('/:id', asyncHandler(showProjectDetailsPage));

export default router;