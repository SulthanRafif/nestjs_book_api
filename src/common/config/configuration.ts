import { JwtSignOptions } from "@nestjs/jwt";

export default () => ({
  port: +process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET,
});


export const refreshTokenConfig: JwtSignOptions = {
  expiresIn: 3600 * 24,
}