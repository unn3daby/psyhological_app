import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<Record<string, string>>(event);

  const findedUser = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (!(findedUser && findedUser.password && findedUser.username)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username or password is not correct',
    });
  }

  const isPasswordValid = bcrypt.compare(findedUser.password as string, password);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username or password is not correct',
    });
  }
});
