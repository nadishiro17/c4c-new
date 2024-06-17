import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to initialize the database
async function initializeDatabase() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Create the partners table if it doesn't exist  
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

// Function to update a partner's details in the database
export async function updatePartner(db: any, id: number, name: string, thumbnailUrl: string, description: string, isActive: boolean) {
    await db.run(
      `UPDATE partners SET name = ?, thumbnailUrl = ?, description = ?, isActive = ? WHERE id = ?`,
      [name, thumbnailUrl, description, isActive, id]
    );
  }

export default initializeDatabase;
