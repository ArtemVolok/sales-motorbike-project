export const host: string | undefined = process.env.SMPT_HOST;
export const port: string | undefined = process.env.SMPT_PORT;
export const mailUser: string | undefined = process.env.SMPT_USER;
export const mailPassword: string | undefined = process.env.SPMT_PASSWORD;
export const frontendUrl: string | undefined = process.env.FRONTEND_URL;
export const jwtAccessTokenKey: string | undefined =
  process.env.JWT_ACCESS_SECRET;
export const jwtRefreshTokenKey: string | undefined =
  process.env.JWT_REFRESH_SECRET;