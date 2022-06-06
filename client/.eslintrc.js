module.exports = {
  env: {
    browser: true,
    es2021: true,
    // jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    // 'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    // project: './tsconfig.json',
  },
  plugins: [
    'react',
    // '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-shadow': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'no-restricted-exports': 0,
    'no-use-before-define': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
}
