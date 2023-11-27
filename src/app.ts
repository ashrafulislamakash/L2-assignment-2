import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/users/user.route';
import { OrderRoutes } from './modules/order/order.route';

const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

// Applications Routes

app.use('/api/users', UserRoutes);
app.use('/api/users', OrderRoutes);

const getAController = (req: Request, res: Response) => {
  res.send(' L2 Assignment  2');
};

app.get('/', getAController);

export default app;
