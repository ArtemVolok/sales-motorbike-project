import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api-error';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
    return;
  }
  res.status(500).json({ message: 'Непередбачувана помилка' });
};
