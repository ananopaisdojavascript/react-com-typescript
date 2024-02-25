module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-useless-catch": "off",
    "no-undef": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-constant-condition": "off",
    "button-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-const": "off"
  },
}
