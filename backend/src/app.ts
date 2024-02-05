import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import { ProfileUserModel } from './schema/profileUser';
import { IMotorcycleCard, MotorcycleCardModel } from './schema/motorcycleCard';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());

const allowedOrigins = [
  'http://127.0.0.1:5000',
  'http://127.0.0.1:3000',
  'http://localhost:5000',
  'http://localhost:3000',
  'https://sales-motorbike.vercel.app',
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    console.log('origin', origin);
    console.log('callback', callback);
    if (!origin || allowedOrigins.includes(origin)) {
      console.log('inside !origin');
      callback(null, true);
    } else {
      console.log('inside origin');
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

async function main() {
  await mongoose
    .connect(
      'mongodb+srv://artemvolok:HYmR9qkjCSf7uw1C@cluster0.7myo4hg.mongodb.net/',
    )
    .then(() => console.log('connection to database success!'));
}
main();

app.post<{}, MessageResponse>('/profileUser/create', async (req, res) => {
  console.log('data from front: ', req.body);
  if (req.body) {
    const addUser = await ProfileUserModel.create(req.body);
    console.log('addUSer', addUser);
    res.json({
      message: req.body,
    });
  }
});

app.get<any>('/profileUser/allUsers', async (_, res) => {
  console.log('inside allUsers');
  const getAllItems = await ProfileUserModel.find({});
  console.log('allUsers', getAllItems);
  res.json({
    message: getAllItems,
  });
});

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

////////****MOTORCYCLE*****////////

app.post(
  '/motorcycleCards/create',
  async (req: Request<any, any, IMotorcycleCard>, res: Response) => {
    if (
      !req.body.name ||
      !req.body.price ||
      !req.body.description ||
      !req.body.vendorCode
    ) {
      return res.status(400).json({
        errorCode: 400,
        errorMessage: 'Incorrect field or some fields are empty',
      });
    }

    const createMotorcycle = await MotorcycleCardModel.create(req.body);
    res.json(createMotorcycle);
  },
);

app.get<any>('/motorcycleCards/allMotorcycle', async (_, res) => {
  const getAllMotorcycle = await MotorcycleCardModel.find({});
  res.json({
    message: getAllMotorcycle,
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
