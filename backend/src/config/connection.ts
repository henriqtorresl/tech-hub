require('dotenv').config();
import { Pool } from 'pg';

export const connection = async () => {
    if (global.connection)
        return global.connection.connect();
 
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });
 
    const client = await pool.connect();
     
    client.release();
 
    global.connection = pool;
    return pool.connect();
}