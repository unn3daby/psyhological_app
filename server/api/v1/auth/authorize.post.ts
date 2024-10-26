import process from 'node:process';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody<Record<string, string>>(event);

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

    if (!(ACCESS_TOKEN_SECRET && REFRESH_TOKEN_SECRET)) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error with JWT',
      });
    }

    if (!(username && password)) {
      throw createError({
        statusCode: 400,
        statusMessage: '',
      });
    }

    const findedUser = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    if (!findedUser) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Пользователь не найден',
      });
    }

    const isPasswordValid = bcrypt.compare(findedUser.password as string, password);

    if (!isPasswordValid) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Пароль неверный',
      });
    }

    const accessPayload = {
      userId: findedUser.id,
    };

    const refreshPayload = {
      userId: findedUser.id,
    };

    const accessToken = jwt.sign(accessPayload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(refreshPayload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
    };
  }
  catch (error) {
    return error;
  }
});
