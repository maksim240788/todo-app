import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from './app/generated/prisma/client';
import { z } from 'zod';

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// Zod schema
const todoSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional()
});

// Routes
app.get('/todos', async (_req: Request, res: Response): Promise<void> => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.post('/todos', async (req: Request, res: Response): Promise<void> => {
  const parse = todoSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json(parse.error);
    return Promise.resolve();
  }

  const todo = await prisma.todo.create({ data: parse.data });
  res.json(todo);
});

app.put('/todos/:id', async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { completed } = req.body;
  const todo = await prisma.todo.update({ where: { id }, data: { completed } });
  res.json(todo);
});

app.delete('/todos/:id', async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  await prisma.todo.delete({ where: { id } });
  res.status(204).send();
});

app.listen(3001, () => console.log('Server running on port 3001'));
