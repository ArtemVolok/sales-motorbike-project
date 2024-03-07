import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api-error';
import { verifyAccessToken } from '../services/tokenService';

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = verifyAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    //TODO: for next generation
    // req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
