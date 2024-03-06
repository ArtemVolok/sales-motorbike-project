import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import upload from '../../middleware/multerMiddleware';
import { MotorcycleCardModel } from '../../schema/MotorcycleCard';
import { motorcycleCardValidation } from '../../schema/MotorcycleCard/utils';
import { IMotorcycleCard } from '../../schema/MotorcycleCard/types';
import ApiError from '../../exceptions/api-error';
import { authHandler } from '../../middleware/auth-middleware';
// import * as authMidd

const motorcycleRouters = express.Router();

motorcycleRouters.post(
  '/motorcycleCards',
  upload.single('uploadImage'),
  motorcycleCardValidation,
  async (
    req: Request<any, any, IMotorcycleCard>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.file) {
        throw ApiError.BadRequest('FormData is empty!');
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Помилка валідації', errors.array());
      }

      const { filename, size, path: filePath, originalname } = req.file;

      const preparedData = {
        ...req.body,
        uploadImage: { filename, size, path: filePath, originalname },
      };

      const createMotorcycle = await MotorcycleCardModel.create(preparedData);
      return res.status(201).json(createMotorcycle);
    } catch (e) {
      next(e);
    }
  },
);

motorcycleRouters.get<any>(
  '/motorcycleCards',
  async (_, res: Response, next: NextFunction) => {
    try {
      const allMotorcycle = await MotorcycleCardModel.find({});

      //TODO: should add check and send error, or send empty array?

      res.status(200).json({
        response: allMotorcycle,
      });
    } catch (error) {
      next(error);
    }
  },
);

motorcycleRouters.get<any>(
  '/motorcycleCardsAdmin',
  authHandler,
  async (_, res: Response, next: NextFunction) => {
    try {
      const allMotorcycle = await MotorcycleCardModel.find({});

      //TODO: should add check and send error, or send empty array?

      res.status(200).json({
        response: allMotorcycle,
      });
    } catch (error) {
      next(error);
    }
  },
);

motorcycleRouters.delete(
  '/motorcycleCards/:id',
  async (
    req: Request<any, any, { id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const idMotorcycleCard = req.params.id;

      await MotorcycleCardModel.findByIdAndDelete(idMotorcycleCard);
      res.status(200).json({ message: 'Motorcycle card successful deleted!' });
    } catch (e) {
      next(e);
    }
  },
);

motorcycleRouters.get(
  '/motorcycleCard/:id',
  async (
    req: Request<any, any, { id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const idMotorcycleCard = req.params.id;

      const motorcycleCard = await MotorcycleCardModel.findById(
        idMotorcycleCard,
      );
      res.status(200).json({ response: motorcycleCard });
    } catch (e) {
      next(e);
    }
  },
);

export default motorcycleRouters;
