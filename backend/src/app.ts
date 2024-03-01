/* eslint-disable import/no-extraneous-dependencies */
import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import multer from 'multer';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';
import bcrypt from 'bcrypt';

console.log('multer', multer);

import * as middlewares from './middleware/middlewares';
import { ProfileUserModel } from './schema/ProfileUser/profileUser';
import { motorcycleCardValidation } from './schema/MotorcycleCard/utils';
import { IMotorcycleCard } from './schema/MotorcycleCard/types';
import upload from './middleware/multerMiddleware';
import MessageResponse from './interfaces/MessageResponse';
import api from './api';
import { MotorcycleCardModel } from './schema/MotorcycleCard';
import { profileUserValidation } from './schema/ProfileUser/utils';
import { IRegistrationForm } from './schema/ProfileUser/types';

const mongodbConnectUrl: string | undefined = process.env.MONGODB_CONNECT_URL;

require('dotenv').config();

const app = express();

app.use('/images', express.static(path.join(__dirname, '/images')));
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
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
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
  if (!mongodbConnectUrl) {
    console.log('wrong database url!');
    return;
  }

  await mongoose
    .connect(mongodbConnectUrl)
    .then(() => {
      console.log('connection to database success!');
      const port = process.env.PORT || 5000;
      app.listen(port, () => {
        console.log(`Listening: http://localhost:${port}`);
      });
    })
    .catch(() => console.log('failed to database connect!'));
}
main();

app.post<{}, MessageResponse>(
  '/profileUser',
  profileUserValidation,
  async (req: Request<any, any, IRegistrationForm>, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const existingUser = await ProfileUserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ errorMessage: 'User already exists', errorCode: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserProfile = await ProfileUserModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.json({
      message: createUserProfile._id,
    });
  },
);

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
  '/motorcycleCards',
  upload.single('uploadImage'),
  motorcycleCardValidation,
  async (req: Request<any, any, IMotorcycleCard>, res: Response) => {
    if (!req.file)
      return res.status(400).json({
        errorCode: 400,
        errorMessage: 'FormData is empty!',
      });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { filename, size, path: filePath, originalname } = req.file;

    const preparedData = {
      ...req.body,
      uploadImage: { filename, size, path: filePath, originalname },
    };

    const createMotorcycle = await MotorcycleCardModel.create(preparedData);
    return res.status(201).json(createMotorcycle);
  },
);

app.get<any>('/motorcycleCards', async (_, res: Response) => {
  const allMotorcycle = await MotorcycleCardModel.find({});

  res.status(200).json({
    response: allMotorcycle,
  });
});

app.delete(
  '/motorcycleCards/:id',
  async (req: Request<any, any, { id: string }>, res: Response) => {
    const idMotorcycleCard = req.params.id;

    await MotorcycleCardModel.findByIdAndDelete(idMotorcycleCard);
    res.status(200).json({ message: 'Motorcycle card successful deleted!' });
  },
);

app.get(
  '/motorcycleCard/:id',
  async (req: Request<any, any, { id: string }>, res: Response) => {
    const idMotorcycleCard = req.params.id;

    const motorcycleCard = await MotorcycleCardModel.findById(idMotorcycleCard);
    res.status(200).json({ response: motorcycleCard });
  },
);

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
