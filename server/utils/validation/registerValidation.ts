const schema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['username', 'password', 'email'],
};
export default ajv.compile(schema);
