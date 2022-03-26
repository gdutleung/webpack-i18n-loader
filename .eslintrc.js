module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['**/*.js', 'lib'],
  rules: {
    'no-unused-vars': ['warn'],
    'space-before-function-paren': 0
  }
}
