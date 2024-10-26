export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
  console.log(event);
  return {
    foo: 'bar',
  };
});
