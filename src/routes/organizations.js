import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from '../controllers/organizations.js';

const router = express.Router();
router.get('/', asyncHandler(showOrganizationsPage));
router.get('/:id', asyncHandler(showOrganizationDetailsPage));

export default router;