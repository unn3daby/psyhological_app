import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const { username, password, email } = await readBody<Record<string, string>>(event);

  if (!(username && password && email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
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
    message: 'User created successfully',
    data: { newUser, password: undefined },
  };
});
