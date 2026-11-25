import db from '../database/index.js';

const createUser = async (firstName, lastName, email, passwordHash) => {
    const query = `
        INSERT INTO users (first_name, last_name, email, password_hash, role)
        VALUES ($1, $2, $3, $4, 'user')
        RETURNING user_id, first_name, last_name, email, role
    `;
    const result = await db.query(query, [firstName, lastName, email, passwordHash]);
    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];
};

const getAllUsers = async () => {
    const result = await db.query(`
        SELECT user_id, first_name, last_name, email, role
        FROM users
        ORDER BY last_name, first_name
    `);
    return result.rows;
};

const ensureUsersTableAndAdmin = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            role VARCHAR(20) NOT NULL DEFAULT 'user'
        )
    `);

    await db.query(`
        INSERT INTO users (first_name, last_name, email, password_hash, role)
        VALUES ($1, $2, $3, $4, 'admin')
        ON CONFLICT (email) DO UPDATE
        SET password_hash = EXCLUDED.password_hash,
            role = 'admin',
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name
    `, [
        'CSE340',
        'Administrator',
        'admin@example.com',
        '$2b$10$BDH8dcJiUGGBqu5hMREqYeRTbKiR0pYMJSoK9Q06M0Fi8kdNfsrc.'
    ]);
};

export { createUser, getUserByEmail, getAllUsers, ensureUsersTableAndAdmin };
