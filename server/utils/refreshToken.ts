import type { H3Event } from 'h3';
import jwt from 'jsonwebtoken';
import * as uuid from 'uuid';
import verifyToken from './verifyToken';

export default function refreshToken(event: H3Event, accessTokenSecret: string, refreshTokenSecret: string) {
  const accessToken = getCookie(event, 'accessToken');
  const refreshToken = getCookie(event, 'refreshToken');

  if (!(accessToken && refreshToken)) {
    throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
  }
  const { error, decoded: accessDecoded } = verifyToken(accessToken, accessTokenSecret);

  if (!error) {
    throw createError({ statusMessage: 'Token still valid', statusCode: 400 });
  }

  if (error === 'TokenExpiredError') {
    // Verify refresh-token

    const { error } = verifyToken(refreshToken, refreshTokenSecret);

    if (error) {
      throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
    };

    if (!accessDecoded || typeof accessDecoded === 'string') {
      throw createError({ statusMessage: 'Error with parsing JWT', statusCode: 500 });
    }

    const [accessTokenJti, refreshTokenJti] = [uuid.v4(), uuid.v4()];

    const newAccessToken = jwt.sign({ userId: accessDecoded.userId, jti: accessTokenJti }, accessTokenSecret, { expiresIn: '5s' });
    const newRefreshToken = jwt.sign({ userId: accessDecoded.userId, jti: refreshTokenJti }, refreshTokenSecret, { expiresIn: '10s' });

    setCookie(event, 'accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'lax' });
    setCookie(event, 'refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'lax' });

    return {
      accessToken: {
        value: newAccessToken,
        jti: accessTokenJti,
      },
      refreshToken: {
        value: newRefreshToken,
        jti: refreshTokenJti,
      },
    };
  }
  else {
    throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
  }
}
