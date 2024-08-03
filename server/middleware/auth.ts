import process from 'node:process';
import jwt from 'jsonwebtoken';

export default eventHandler(async (event) => {
  // Protect all API endpoints inside protected
  if (!event.node.req.url?.startsWith('/api/protected')) {
    return;
  }

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET) {
    throw createError({ statusMessage: 'Error with JWT', statusCode: 500 });
  }

  const accessToken = getCookie(event, 'accessToken');

  if (!accessToken) {
    throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
  }

  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  }
  catch (error) {
    if (!REFRESH_TOKEN_SECRET) {
      throw createError({ statusMessage: 'Error with parsing JWT', statusCode: 500 });
    }
    if (error instanceof jwt.TokenExpiredError) {
      refreshToken(event, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET);
    }
    if (error instanceof Error && !(error instanceof jwt.TokenExpiredError)) {
      throw createError({ statusMessage: error.message, statusCode: 401 });
    }
  }
});
