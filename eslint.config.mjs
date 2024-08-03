import antfu from '@antfu/eslint-config';

export default antfu({
  // Enable stylistic formatting rules
  stylistic: {
    indent: 2,
    quotes: 'single',
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
