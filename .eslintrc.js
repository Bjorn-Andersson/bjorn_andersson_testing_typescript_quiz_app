module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    //place to specify eslint rules, can be rules that override rules specified from the extended configs.
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
