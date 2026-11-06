import { getAllCategories, getCategoryDetails, getProjectsByCategoryId } from '../models/categories.js';

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

export { showCategoriesPage, showCategoryDetailsPage };