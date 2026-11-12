import { 
    getAllCategories, getCategoryDetails, getProjectsByCategoryId, 
    createCategory, updateCategory 
} from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Categories', categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);

    if (!category) {
        return res.status(404).render('404', { title: 'Category Not Found' });
    }

    const projects = await getProjectsByCategoryId(categoryId);
    res.render('category', { title: category.name, category, projects });
};

// --- NEW FOR W04 ---

const showNewCategoryForm = async (req, res) => {
    res.render('new-category', { title: 'New Category', name: '' });
};

const processNewCategory = async (req, res) => {
    const name = req.body.name ? req.body.name.trim() : '';
    const errors = [];

    // Server-side validation
    if (!name || name.length < 3 || name.length > 100) {
        errors.push('Category name must be between 3 and 100 characters.');
    }

    if (errors.length > 0) {
        return res.render('new-category', { title: 'New Category', errors, name });
    }

    await createCategory(name);
    req.flash('success', 'Category created successfully!');
    res.redirect('/categories');
};

const showEditCategoryForm = async (req, res) => {
    const category = await getCategoryDetails(req.params.id);
    if (!category) {
        return res.status(404).render('404', { title: 'Category Not Found' });
    }
    res.render('edit-category', { title: 'Edit Category', category });
};

const processEditCategory = async (req, res) => {
    const categoryId = req.params.id;
    const name = req.body.name ? req.body.name.trim() : '';
    const errors = [];

    // Server-side validation
    if (!name || name.length < 3 || name.length > 100) {
        errors.push('Category name must be between 3 and 100 characters.');
    }

    if (errors.length > 0) {
        return res.render('edit-category', { 
            title: 'Edit Category', 
            errors, 
            category: { category_id: categoryId, name } 
        });
    }

    await updateCategory(categoryId, name);
    req.flash('success', 'Category updated successfully!');
    res.redirect('/categories');
};

export { 
    showCategoriesPage, showCategoryDetailsPage, 
    showNewCategoryForm, processNewCategory, 
    showEditCategoryForm, processEditCategory 
};