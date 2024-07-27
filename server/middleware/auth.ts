import process from 'node:process';
import jwt from 'jsonwebtoken';

export default eventHandler(async (event) => {
  // Protect all API endpoints inside protected
  if (!event.node.req.url?.startsWith('/api/protected')) {
    return;
  }

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET) {
    throw createError({ statusMessage: 'Error with JWT', statusCode: 500 });
  }

  const accessToken = getCookie(event, 'accessToken');

  if (!accessToken) {
    throw createError({ statusMessage: 'Forbidden', statusCode: 403 });
  }

  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  }
  catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
    }
    else if (error instanceof jwt.JsonWebTokenError) {
      throw createError({ statusMessage: 'Forbidden', statusCode: 403 });
    }
    else {
      throw createError({ statusMessage: 'Unexpected error with auth', statusCode: 500 });
    }
  }
});
