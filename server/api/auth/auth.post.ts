import process from 'node:process';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<Record<string, string>>(event);

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!(ACCESS_TOKEN_SECRET && REFRESH_TOKEN_SECRET)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error with JWT',
    });
  }

  const findedUser = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (!(findedUser && findedUser.password && findedUser.username)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Username or password is not correct',
    });
  }

  const isPasswordValid = bcrypt.compare(findedUser.password as string, password);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Username or password is not correct',
    });
  }

  const accessPayload = {
    userId: findedUser.id,
    jti: uuid.v4(),
  };

  const refreshPayload = {
    userId: findedUser.id,
    jti: uuid.v4(),
  };

  const accessToken = jwt.sign(accessPayload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(refreshPayload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  await prisma.refreshTokens.create({
    data: {
      userId: findedUser.id,
      RefreshToken: refreshToken,
      jti: refreshPayload.jti,
    },
  });

  setCookie(event, 'refreshToken', refreshToken, { httpOnly: true/* , secure: true, sameSite: 'strict'  */ });

  return {
    statusCode: 200,
    body: {
      message: 'User authorized successfully',
      data: {
        accessToken,
        refreshToken,
      },
    },
  };
});
