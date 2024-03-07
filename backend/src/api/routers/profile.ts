import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import { ProfileUserModel } from '../../schema/ProfileUser/profileUser';
import {
  loginValidation,
  profileUserValidation,
} from '../../schema/ProfileUser/utils';
import { ILoginForm, IRegistrationForm } from '../../schema/ProfileUser/types';
import ApiError from '../../exceptions/api-error';
import {
  generateTokens,
  removeToken,
  saveToken,
} from '../../services/tokenService';
import { sendActivationEmail } from '../../services/mailService';
import MessageResponse from '../../interfaces/MessageResponse';
import { lifeTimeCookie } from '../../constants';

const frontendUrl: string | undefined = process.env.FRONTEND_URL;

const profileRouters = express.Router();

profileRouters.post(
  '/login',
  loginValidation,
  async (
    req: Request<any, any, ILoginForm>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Помилка при валідації', errors.array()),
        );
      }

      const { email, password } = req.body;
      const user = await ProfileUserModel.findOne({ email });

      if (!user) {
        throw ApiError.BadRequest('Користувача не знайдено');
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw ApiError.BadRequest('Невірний пароль');
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
        maxAge: lifeTimeCookie,
        httpOnly: true,
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

profileRouters.post<{}, MessageResponse>(
  '/profileUser',
  profileUserValidation,
  async (
    req: Request<any, any, IRegistrationForm>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Помилка при валідації', errors.array());
      }

      const { email, password } = req.body;
      const existingUser = await ProfileUserModel.findOne({ email });

      if (existingUser) {
        //TODO: which status should use for this error?
        throw ApiError.BadRequest('Користувач з такою поштою вже існує');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const activationLink = uuidv4();

      const createUserProfile = await ProfileUserModel.create({
        ...req.body,
        password: hashedPassword,
        activationLink,
      });

      await sendActivationEmail({
        to: email,
        link: `${frontendUrl}/activation/${activationLink}`,
      });

      const payload = {
        id: createUserProfile._id.toString(),
        userEmail: createUserProfile.email,
        isActivated: createUserProfile.isActivated,
      };
      const tokens = generateTokens(payload);

      await saveToken({
        userId: payload.id,
        refreshToken: tokens.refreshToken,
      });

      //TODO: should need add cookie when we registration user?
      // res.cookie('refreshToken', tokens.refreshToken, {
      //   maxAge: 2592000000,
      //   httpOnly: true,
      // });

      res.status(200).json({
        ...tokens,
        payload,
      });
    } catch (e) {
      next(e);
    }
  },
);

profileRouters.post(
  '/logout',
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

      const removedToken = await removeToken(refreshToken);

      if (!removedToken) {
        throw ApiError.UnauthorizedError(
          'Не вдалося видалити токен з бази даних',
        );
      }

      res.clearCookie('refreshToken');
      return res
        .status(200)
        .json({ message: 'refreshToken успішно видалений' });
    } catch (e) {
      next(e);
    }
  },
);

profileRouters.get(
  '/profileUser/allUsers',
  async (_, res: Response, next: NextFunction) => {
    try {
      const getAllItems = await ProfileUserModel.find({});

      //TODO: should add this check, or send empty array?
      if (!getAllItems) {
        throw ApiError.BadRequest('Користувачів не знайдено');
      }
      res.json({
        message: getAllItems,
      });
    } catch (e) {
      next(e);
    }
  },
);

export default profileRouters;
