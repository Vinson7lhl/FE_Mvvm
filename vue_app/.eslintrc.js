module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'pro' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'pro' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}