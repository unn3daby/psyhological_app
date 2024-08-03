export default defineEventHandler(async () => {
  throw createError({ statusCode: 404, statusMessage: 'Not found' });
});
