import express, { NextFunction, Request, Response } from 'express';

import {
  findToken,
  generateTokens,
  saveToken,
  verifyRefreshToken,
} from '../../services/tokenService';
import { activateUserAccount } from '../../services/mailService';
import { ProfileUserModel } from '../../schema/ProfileUser/profileUser';
import ApiError from '../../exceptions/api-error';

const servicesRouters = express.Router();

servicesRouters.get(
  '/activation/:activationLink',
  async (
    req: Request<any, any, { activationLink: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const activationLink = req.params.activationLink;

      if (!activationLink) {
        throw ApiError.BadRequest('Activation link not found');
      }

      const activation = await activateUserAccount({ activationLink });

      if (!activation) {
        throw ApiError.BadRequest('Користувача з таким посиланням не знайдено');
      }

      res.status(200).json({ message: 'Successful activation' });
    } catch (e) {
      next(e);
    }
  },
);

servicesRouters.get(
  '/refresh',
  async (
    req: Request<any, any, { refreshToken: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        throw ApiError.UnauthorizedError('RefreshToken не знайдено');
      }

      const userData: any = verifyRefreshToken(refreshToken);
      if (!userData) {
        throw ApiError.UnauthorizedError('Помилка при валідації токена');
      }

      const tokenFromDatabase = await findToken(refreshToken);

      if (!tokenFromDatabase) {
        throw ApiError.UnauthorizedError('Токен в базі даних не знайдено');
      }

      const user = await ProfileUserModel.findById(userData.id);

      if (!user) {
        throw ApiError.UnauthorizedError('Користувача не знайдено');
      }

      const payload = {
        id: user._id.toString(),
        userEmail: user.email,
        isActivated: user.isActivated,
      };

      const tokens = generateTokens(payload);

      await saveToken({
        userId: payload.id,
        refreshToken: tokens.refreshToken,
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
      });

      res.status(200).json({
        ...tokens,
        payload,
      });
    } catch (e) {
      next(e);
    }
  },
);

export default servicesRouters;
