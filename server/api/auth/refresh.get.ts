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

  const accessToken = getCookie(event, 'accessToken');

  if (!accessToken) {
    throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
  }

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
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  try {
    const verifiedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    if (typeof verifiedToken === 'string') {
      throw createError({ statusMessage: 'Error with parsing jwt', statusCode: 500 });
    }

    const findedRefresh = await prisma.refreshTokens.findUnique({
      where: { jti: verifiedToken.jti },
    });

    if (!findedRefresh || findedRefresh.RefreshToken !== refreshToken) {
      throw createError({
        statusCode: 401,
        message: 'Invalid refresh token',
      });
    }

    await prisma.refreshTokens.delete({
      where: { jti: verifiedToken.jti },
    });

    const refreshJti = uuid.v4();

    const accessToken = jwt.sign({ userId: verifiedToken.userId, jti: uuid.v4() }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ userId: verifiedToken.userId, jti: refreshJti }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    await prisma.refreshTokens.create({
      data: {
        userId: verifiedToken.userId,
        jti: refreshJti,
        RefreshToken: newRefreshToken,
      },
    });

    setCookie(event, 'refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'lax' });
    setCookie(event, 'accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'lax' });

    return {
      statusCode: 200,
      message: 'Refreshed successfully',
    };
  }
  catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const decoded = jwt.decode(refreshToken);
      if (typeof decoded === 'string') {
        throw createError({ statusMessage: 'Unauthorised', statusCode: 401 });
      }
      await prisma.refreshTokens.delete({
        where: { jti: decoded?.jti },
      });
      throw createError({ statusMessage: 'Unauthorised', statusCode: 401 });
    }
    else if (error instanceof jwt.JsonWebTokenError) {
      throw createError({ statusMessage: 'Unauthorised', statusCode: 401 });
    }
    else {
      throw createError({ statusMessage: 'Unexpected error with refresh', statusCode: 500 });
    }
  }
});
