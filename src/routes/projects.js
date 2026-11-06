import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { getProjectsPage, showProjectDetailsPage } from '../controllers/projects.js';

const router = express.Router();
router.get('/', asyncHandler(getProjectsPage));
router.get('/:id', asyncHandler(showProjectDetailsPage));

export default router;