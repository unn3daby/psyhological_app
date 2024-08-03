import process from 'node:process';

export default defineEventHandler(async (event) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!(REFRESH_TOKEN_SECRET && ACCESS_TOKEN_SECRET)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error with JWT',
    });
  }

  refreshToken(event, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET);
});
