import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const { username, password, email } = await readBody<Record<string, string>>(event);

  if (!(username && password && email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
      stack: undefined,
    });
  }

  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ],
    },
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists',
      stack: undefined,
    });
  }

  const newUser = await prisma.users.create({
    data: {
      email,
      username,
      password: await bcrypt.hash(password, 10),
    },
  });

  return {
    statusCode: 200,
    body: {
      message: 'User created successfully',
      user: newUser,
    },
  };
});
