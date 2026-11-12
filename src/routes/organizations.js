import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { 
    showOrganizationsPage, 
    showOrganizationDetailsPage, 
    showNewOrganizationForm, 
    processNewOrganization, 
    showEditOrganizationForm, 
    processEditOrganization 
} from '../controllers/organizations.js';

const router = express.Router();

router.get('/', asyncHandler(showOrganizationsPage));

// W04: Create Routes
router.get('/new-organization', asyncHandler(showNewOrganizationForm));
router.post('/new-organization', asyncHandler(processNewOrganization));

// W04: Edit Routes
router.get('/edit-organization/:id', asyncHandler(showEditOrganizationForm));
router.post('/edit-organization/:id', asyncHandler(processEditOrganization));

// Dynamic Route MUST be at the bottom
router.get('/:id', asyncHandler(showOrganizationDetailsPage));

export default router;