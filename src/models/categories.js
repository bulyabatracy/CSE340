import db from '../database/index.js';

const getAllCategories = async () => {
    const query = 'SELECT category_id, name FROM category ORDER BY name';
    const result = await db.query(query);
    return result.rows;
};

const getCategoryDetails = async (categoryId) => {
    const query = 'SELECT category_id, name FROM category WHERE category_id = $1';
    const result = await db.query(query, [categoryId]);
    return result.rows[0];
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT p.project_id, p.name
        FROM project p
        JOIN project_category pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name
        FROM category c
        JOIN project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

// NEW: For W04 Create
const createCategory = async (name) => {
    const query = 'INSERT INTO category (name) VALUES ($1) RETURNING *';
    const result = await db.query(query, [name]);
    return result.rows[0];
};

// NEW: For W04 Edit
const updateCategory = async (categoryId, name) => {
    const query = 'UPDATE category SET name = $1 WHERE category_id = $2 RETURNING *';
    const result = await db.query(query, [name, categoryId]);
    return result.rows[0];
};

export { 
    getAllCategories, getCategoryDetails, getProjectsByCategoryId, 
    getCategoriesByProjectId, createCategory, updateCategory 
};