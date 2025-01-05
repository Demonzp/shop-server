import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cors from 'cors';
import path from 'node:path';
import { errorHandle } from './middlewares/errorHandle';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const p = path.join(__dirname, '../public');
//console.log('p = ', p);
app.use(express.static(p));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use(authRouter);
app.use(userRouter);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});