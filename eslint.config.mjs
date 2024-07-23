import antfu from '@antfu/eslint-config';

export default antfu({
  // Enable stylistic formatting rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
    semi: true,
  },
  rules: {
    'vue/block-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
  },
  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: ['**/fixtures'],
});
