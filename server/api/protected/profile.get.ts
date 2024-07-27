import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'accessToken');

  if (!accessToken) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden',
    });
  }

  const decoded = jwt.decode(accessToken);

  if (typeof decoded === 'string') {
    throw createError({
      statusCode: 500,
      message: 'Error with JWT',
    });
  }

  const profile = await prisma.users.findUnique({
    where: {
      id: decoded?.userId,
    },
  });

  return {
    statusCode: 200,
    data: { ...profile, password: undefined },
  };
});
