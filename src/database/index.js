import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL ?? '';
const useSSL = process.env.NODE_ENV?.toLowerCase() === 'development'
    || process.env.RENDER === 'true'
    || databaseUrl.includes('.render.com');

const pool = new Pool({
    connectionString: databaseUrl,
    ssl: useSSL
        ? { rejectUnauthorized: false }
        : false
});

export default pool;