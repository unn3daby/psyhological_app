import process from 'node:process';

export default defineEventHandler(async () => {
  // if (event.path.startsWith('/api') || openedPaths.includes(event.path)) {
  //   return;
  // }

  // const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  // if (!REFRESH_TOKEN_SECRET) {
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: 'Error with JWT',
  //   });
  // }

  // const refreshToken = getCookie(event, 'refreshToken');
  // const accessToken = getCookie(event, 'accessToken');

  // if (!refreshToken || !accessToken) {
  //   return sendRedirect(event, '/auth');
  // }

  // const { error } = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);

  // if (error) {
  //   return sendRedirect(event, '/auth');
  // }
});
