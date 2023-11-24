import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/users/user.route';
const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

// Applications Routes

app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Assignmenet  2');
};

app.get('/', getAController);

export default app;
