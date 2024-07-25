import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);

  if (!headers.authorization) {
    throw createError({ statusMessage: 'Unauhorized', statusCode: 401 });
  }

  const [_, token] = headers.authorization.split(' ');

  const decoded = jwt.decode(token);

  if (typeof decoded === 'string') {
    throw createError({
      statusCode: 500,
      message: 'Error with JWT decoding',
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
