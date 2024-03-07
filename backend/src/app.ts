/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import multer from 'multer';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';
import cookieParser from 'cookie-parser';

console.log('multer', multer);

import * as middlewares from './middleware/middlewares';
import { errorHandler } from './middleware/error-middleware';
import motorcycleRouters from './api/routers/motorcycle';
import profileRouters from './api/routers/profile';
import servicesRouters from './api/routers/services';
import './middleware/error-middleware';

const mongodbConnectUrl: string | undefined = process.env.MONGODB_CONNECT_URL;

require('dotenv').config();

const app = express();

app.use('/api/images', express.static(path.join(__dirname, '/images')));
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
app.use(cookieParser());

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

app.use('/api/', motorcycleRouters);
app.use('/api/', servicesRouters);
app.use('/api/', profileRouters);

app.use(middlewares.notFound);
app.use(errorHandler);

export default app;
