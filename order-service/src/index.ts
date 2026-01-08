import express, { Request, Response } from 'express';

const app = express();
const PORT = 3002;

// Enable JSON body parsing
app.use(express.json());

// Mock order data
let orders = [
  { orderId: 1, userId: 1, amount: 49.99 },
  { orderId: 2, userId: 2, amount: 29.99 },
  { orderId: 3, userId: 1, amount: 15.50 },
];

let nextOrderId = 4;

// GET /orders?userId=:id
app.get('/orders', (req: Request, res: Response) => {
  const userId = req.query.userId ? parseInt(req.query.userId as string, 10) : null;

  if (userId !== null) {
    // Filter active orders for the user
    const userOrders = orders.filter(order => order.userId === userId);
    res.json(userOrders);
  } else {
    // Return all orders if no userId specified
    res.json(orders);
  }
});

// POST /orders
app.post('/orders', (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  if (!userId || amount === undefined) {
    return res.status(400).json({ error: 'userId and amount are required' });
  }

  const newOrder = {
    orderId: nextOrderId++,
    userId: parseInt(userId, 10),
    amount: parseFloat(amount),
  };

  orders.push(newOrder);
  res.status(200).json(newOrder);
});

app.listen(PORT, () => {
  console.log(`Order SVC is running on port ${PORT}`);
});

