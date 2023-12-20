import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import { ProfileUserModel } from './schema/profileUser';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
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

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
