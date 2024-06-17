import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
const app = express();
const port = 4000;
// SQLite setup
const dbPromise = open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});
app.use(express.json());
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.get('/', async (_req, res) => {
    const db = await dbPromise;
    const partners = await db.all('SELECT * FROM partners');
    res.status(200).json(partners);
});
app.post('/', async (req, res) => {
    const { name, thumbnailUrl, description, isActive } = req.body;
    const db = await dbPromise;
    const result = await db.run('INSERT INTO partners (name, thumbnailUrl, description, isActive) VALUES (?, ?, ?, ?)', [name, thumbnailUrl, description, isActive]);
    res.status(201).json({ id: result.lastID });
});
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await dbPromise;
    await db.run('DELETE FROM partners WHERE id = ?', [id]);
    res.status(200).json({ success: true });
});
app.listen(port, () => {
    console.log(`Express server starting on port ${port}!`);
});
