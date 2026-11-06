import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { showCategoriesPage, showCategoryDetailsPage } from '../controllers/categories.js';

const router = express.Router();
router.get('/', asyncHandler(showCategoriesPage));
router.get('/:id', asyncHandler(showCategoryDetailsPage));

export default router;