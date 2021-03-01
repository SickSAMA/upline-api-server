module.exports = {
  // ESLint will stop looking in parent folders once it finds a configuration with "root": true
  root: true,
  env: {
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': 'off',
    'object-curly-spacing': ['error', 'always'],
    'require-jsdoc': 'off',
    'new-cap': ['error', { capIsNew: false }],
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
