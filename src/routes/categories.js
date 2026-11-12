import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { 
    showCategoriesPage, showCategoryDetailsPage, 
    showNewCategoryForm, processNewCategory, 
    showEditCategoryForm, processEditCategory 
} from '../controllers/categories.js';

const router = express.Router();

router.get('/', asyncHandler(showCategoriesPage));
router.get('/new-category', asyncHandler(showNewCategoryForm));
router.post('/new-category', asyncHandler(processNewCategory));
router.get('/edit-category/:id', asyncHandler(showEditCategoryForm));
router.post('/edit-category/:id', asyncHandler(processEditCategory));

router.get('/:id', asyncHandler(showCategoryDetailsPage));

export default router;