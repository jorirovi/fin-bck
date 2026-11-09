import mysql from 'mysql2/promise';
import type { Pool, PoolOptions } from 'mysql2/promise';
import 'dotenv/config.js';

function getEnv(nombre: string): string {
    const valor = process.env[nombre];

    if (!valor) {
        throw new Error(`La Variable de Entorno ${nombre} no esta definida`);
    }

    return valor;
}


const dbConfig: PoolOptions = {
    host: getEnv('DB_HOST'),
    user: getEnv('DB_USER'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
    port: Number(getEnv('DB_PORT') ?? 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

export const pool: Pool = mysql.createPool(dbConfig);