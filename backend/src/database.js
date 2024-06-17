import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
async function initializeDatabase() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    await db.exec(`
    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      thumbnailUrl TEXT,
      description TEXT,
      isActive BOOLEAN
    )
  `);
    return db;
}
export default initializeDatabase;
