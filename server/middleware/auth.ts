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

  const headers = getHeaders(event);

  if (!headers.authorization) {
    throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
  }

  const [authType, token] = headers.authorization.split(' ');

  if (authType.toLowerCase() !== 'bearer') {
    throw createError({ statusMessage: `Auth type ${authType} is not supported`, statusCode: 400 });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET);
  }
  catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
    }
    else if (error instanceof jwt.JsonWebTokenError) {
      throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
    }
    else {
      throw createError({ statusMessage: 'Unexpected error with auth', statusCode: 500 });
    }
  }
});
