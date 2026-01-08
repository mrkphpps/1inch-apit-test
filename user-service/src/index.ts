import express, { Request, Response } from 'express';

const app = express();
const PORT = 3001;

// Mock user data
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
];

// GET /users/:id
app.get('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`User SVC is runnng on port ${PORT}`);
});

