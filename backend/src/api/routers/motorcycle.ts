/* eslint-disable @typescript-eslint/indent */
import fs from 'fs';
import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import upload from '../../middleware/multerMiddleware';
import { MotorcycleCardModel } from '../../schema/MotorcycleCard';
import { motorcycleCardValidation } from '../../schema/MotorcycleCard/utils';
import {
  IMotorcycleCard,
  // IUpdateMotorcycleCard,
} from '../../schema/MotorcycleCard/types';
import ApiError from '../../exceptions/api-error';
import { authHandler } from '../../middleware/auth-middleware';

const motorcycleRouters = express.Router();

motorcycleRouters.post(
  '/motorcycleCards',
  authHandler,
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

      return res.status(201).json({
        message: 'Нова картка мотоциклу успішно створена',
        response: createMotorcycle,
      });
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
  authHandler,
  async (
    req: Request<any, any, { id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const idMotorcycleCard = req.params.id;

      const motorcycleData = await MotorcycleCardModel.findById(
        idMotorcycleCard,
      );

      if (motorcycleData?.id) {
        const pathToImage = `src/images/${motorcycleData?.uploadImage?.filename}`;

        fs.access(pathToImage, fs.constants.F_OK, (err) => {
          if (err) {
            console.error('File does not exist:', err);
            return;
          }

          fs.unlink(pathToImage, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error removing file:', unlinkErr);
              return;
            }
            console.log('File removed successfully');
          });
        });
      }

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

      if (!motorcycleCard) {
        throw ApiError.BadRequest('ID картки мотоцикла не знайдено');
      }

      res.status(200).json({ response: motorcycleCard });
    } catch (e) {
      next(e);
    }
  },
);

motorcycleRouters.put(
  '/motorcycleCard/:id',
  authHandler,
  upload.single('uploadImage'),
  motorcycleCardValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idMotorcycleCard = req.params.id;

      if (!idMotorcycleCard) {
        throw ApiError.BadRequest('ID картки мотоцикла не знайдено');
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Помилка валідації', errors.array());
      }

      const motorcycleCardData = req.body;
      const fileMotorcycle = req.file;

      if (fileMotorcycle) {
        const motorcycleFromDatabase = await MotorcycleCardModel.findById(
          idMotorcycleCard,
        );

        const pathToImage = `src/images/${motorcycleFromDatabase?.uploadImage?.filename}`;

        fs.access(pathToImage, fs.constants.F_OK, (err) => {
          if (err) {
            console.error('File does not exist:', err);
            return;
          }

          fs.unlink(pathToImage, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error removing file:', unlinkErr);
              return;
            }
            console.log('File removed successfully');
          });
        });
      }

      const preparedData = fileMotorcycle
        ? {
            ...motorcycleCardData,
            uploadImage: {
              path: fileMotorcycle.path,
              filename: fileMotorcycle.filename,
              originalname: fileMotorcycle.originalname,
              size: fileMotorcycle.size,
            },
          }
        : motorcycleCardData;

      const updateMotorcycleInfo = await MotorcycleCardModel.findByIdAndUpdate(
        idMotorcycleCard,
        preparedData,
        { new: true },
      );

      if (!updateMotorcycleInfo) {
        throw ApiError.BadRequest('Помилка при оновленні даних в базі даних');
      }

      res.json({
        message: 'Успішне оновлення даних мотоциклу',
        response: updateMotorcycleInfo,
      });
    } catch (e) {
      next(e);
    }
  },
);

export default motorcycleRouters;
