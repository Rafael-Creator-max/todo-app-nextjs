// import mysql from 'mysql2';
// import type { Pool, PoolConnection, RowDataPacket, ResultSetHeader } from 'mysql2';

// const pool: Pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'root',
//   database: process.env.DB_NAME || 'todos',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Create todos table if it doesn't exist
// pool.query(`
//   CREATE TABLE IF NOT EXISTS todos (
//     id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
//     title VARCHAR(255) NOT NULL,
//     checked BOOLEAN DEFAULT FALSE,
//     image VARCHAR(255),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   )
// `, (error) => {
//   if (error) {
//     console.error('Error creating todos table:', error);
//   } else {
//     console.log('Todos table is ready');
//   }
// });

// // Handle process termination
// process.on('SIGINT', () => {
//   pool.end((err) => {
//     if (err) {
//       console.error('Error closing database connections:', err);
//       process.exit(1);
//     }
//     console.log('Database connections closed');
//     process.exit(0);
//   });
// });

// export function query<T = RowDataPacket[]>(sql: string, values: unknown[] = []): Promise<T> {
//   return new Promise((resolve, reject) => {
//     pool.query(sql, values, (error, results) => {
//       if (error) {
//         console.error('Query error:', error);
//         return reject(error);
//       }
//       resolve(results as T);
//     });
//   });
// }

// export function execute<T = ResultSetHeader>(sql: string, values: unknown[] = []): Promise<T> {
//   return new Promise((resolve, reject) => {
//     pool.execute(sql, values, (error, results) => {
//       if (error) {
//         console.error('Execute error:', error);
//         return reject(error);
//       }
//       resolve(results as T);
//     });
//   });
// }

// export function getConnection(): Promise<PoolConnection> {
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(connection);
//     });
//   });
// }
import mysql, { Pool, RowDataPacket, ResultSetHeader , } from 'mysql2/promise';

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'todos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create todos table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    checked BOOLEAN DEFAULT FALSE,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).then(() => {
  console.log('Todos table is ready');
}).catch((error: Error) => {
  console.error('Error creating todos table:', error);
});

// Handle process termination
process.on('SIGINT', () => {
  pool.end()
    .then(() => {
      console.log('Database connections closed');
      process.exit(0);
    })
    .catch((err: Error) => {
      console.error('Error closing database connections:', err);
      process.exit(1);
    });
});

// Query function
export async function query<T extends RowDataPacket[] = RowDataPacket[]>(
  sql: string,
  values: unknown[] = []
): Promise<T> {
  const [rows] = await pool.query(sql, values);
  return rows as T;
}

// Execute function
export async function execute<T extends ResultSetHeader = ResultSetHeader>(
  sql: string,
  values: unknown[] = []
): Promise<T> {
  const [result] = await pool.execute(sql, values);
  return result as T;
}

