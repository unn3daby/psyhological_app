import process from 'node:process';
import jwt from 'jsonwebtoken';
import * as uuid from 'uuid';

export default defineEventHandler(async (event) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!(REFRESH_TOKEN_SECRET && ACCESS_TOKEN_SECRET)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error with JWT',
    });
  }

  const { accessToken } = await readBody<Record<string, string>>(event);

  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    throw new Error('tokenIsValid');
  }
  catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Continue token refreshing
    }
    else if (error instanceof jwt.JsonWebTokenError) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }
    else if (error instanceof Error && error.message === 'tokenIsValid') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Access token still valid',
      });
    }
    else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Unexpected server error',
      });
    }
  }

  const refreshToken = getCookie(event, 'refreshToken');

  if (!refreshToken) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden',
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    if (typeof decoded === 'string') {
      throw createError({ statusMessage: 'Error with parsing jwt', statusCode: 500 });
    }

    const refreshJti = uuid.v4();

    const accessToken = jwt.sign({ userId: decoded.userId, jti: uuid.v4() }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ userId: decoded.userId, jti: refreshJti }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    prisma.refreshTokens.delete({
      where: { jti: decoded.jti },
    });

    prisma.refreshTokens.create({
      data: {
        userId: decoded.userId,
        jti: refreshJti,
        RefreshToken: newRefreshToken,
      },
    });

    return {
      statusCode: 200,
      body: {
        message: 'Refreshed successfully',
        data: {
          accessToken,
          newRefreshToken,
        },
      },
    };
  }
  catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw createError({ statusMessage: 'Forbidden', statusCode: 403 });
    }
    else if (error instanceof jwt.JsonWebTokenError) {
      throw createError({ statusMessage: 'Unauthorised', statusCode: 401 });
    }
    else {
      throw createError({ statusMessage: 'Unexpected error with refresh', statusCode: 500 });
    }
  }
});
