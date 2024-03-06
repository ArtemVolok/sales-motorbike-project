// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { TokenModel } from '../schema/Token';
import { jwtAccessTokenKey, jwtRefreshTokenKey } from '../constants';

interface IGenerateTokens {
  id: string;
  userEmail: string;
  isActivated: boolean;
}

interface ISaveToken {
  userId: string;
  refreshToken: string;
}

export const generateTokens = (payload: IGenerateTokens) => {
  if (!jwtAccessTokenKey) {
    throw new Error('JWT access secret is undefined');
  }
  const accessToken = jwt.sign(payload, jwtAccessTokenKey, {
    expiresIn: '30m',
  });

  if (!jwtRefreshTokenKey) {
    throw new Error('JWT refresh secret is undefined');
  }
  const refreshToken = jwt.sign(payload, jwtRefreshTokenKey, {
    expiresIn: '30d',
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const saveToken = async ({ userId, refreshToken }: ISaveToken) => {
  const tokenData = await TokenModel.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;

    return tokenData.save();
  }

  const token = await TokenModel.create({ user: userId, refreshToken });
  return token;
};

export const removeToken = async (refreshToken: string) => {
  if (!refreshToken) {
    return null;
  }

  const token = await TokenModel.deleteOne({ refreshToken });
  return token;
};

export const findToken = async (refreshToken: string) => {
  const tokenData = await TokenModel.findOne({ refreshToken });

  return tokenData;
};

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) {
    return null;
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    if (!jwtRefreshTokenKey) {
      return null;
    }
    //TODO: add check to refreshToken (it is probably null)
    const userData = jwt.verify(refreshToken, jwtRefreshTokenKey);

    return userData;
  } catch (error) {
    return null;
  }
};

export const verifyAccessToken = (accessToken: string) => {
  try {
    if (!jwtAccessTokenKey) {
      return null;
    }
    const userData = jwt.verify(accessToken, jwtAccessTokenKey);

    return userData;
  } catch (error) {
    return null;
  }
};
