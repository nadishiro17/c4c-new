import express, { Express } from 'express';
import { PartnerDetails } from './types';
import initializeDatabase, { updatePartner } from './database.js';

const app: Express = express();
const port = 4000;

app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

(async () => {
  const db = await initializeDatabase();

  app.get('/', async (_req, res) => {
    const partners = await db.all<PartnerDetails[]>('SELECT * FROM partners');
    res.status(200).json(partners);
  });

  app.post('/', async (req, res) => {
    const { name, thumbnailUrl, description, isActive } = req.body;
    const result = await db.run(
      'INSERT INTO partners (name, thumbnailUrl, description, isActive) VALUES (?, ?, ?, ?)',
      [name, thumbnailUrl, description, isActive]
    );
    const newPartner = {
      id: result.lastID,
      name,
      thumbnailUrl,
      description,
      isActive
    };
    res.status(201).json(newPartner);
  });

  app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, thumbnailUrl, description, isActive } = req.body;
    await updatePartner(db, parseInt(id), name, thumbnailUrl, description, isActive);
    res.status(200).json({ success: true });
  });

  app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.run('DELETE FROM partners WHERE id = ?', [id]);
    res.status(200).json({ success: true });
  });

  app.get('/search', async (req, res) => {
    const { name, isActive } = req.query;
    let query = 'SELECT * FROM partners WHERE 1=1';
    const params: (string | number | boolean)[] = [];

    if (name) {
      query += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }
    if (isActive) {
      query += ' AND isActive = ?';
      params.push(isActive === 'true');
    }

    const partners = await db.all<PartnerDetails[]>(query, params);
    res.status(200).json(partners);
  });

  app.listen(port, () => {
    console.log(`Express server starting on port ${port}!`);
  });
})();
