module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  env: {
    node: true,
    es2022: true
  },
  rules: {
    // Allow any type when explicitly needed
    '@typescript-eslint/no-explicit-any': 'warn',

    // Allow unused vars that start with underscore
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],

    // Relax some strict rules for MCP server patterns
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',

    // Enforce consistent code style
    '@typescript-eslint/naming-convention': ['error',
      {
        selector: 'interface',
        format: ['PascalCase']
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase']
      },
      {
        selector: 'enum',
        format: ['PascalCase']
      }
    ],

    // Prevent console.log in production code (console.error is allowed)
    'no-console': ['warn', { allow: ['error', 'warn'] }],

    // Prefer const over let when variable is not reassigned
    'prefer-const': 'error',

    // No var declarations
    'no-var': 'error',

    // Require === and !==
    'eqeqeq': ['error', 'always']
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'build.js',
    '*.config.js',
    'jest.config.js',
    '.eslintrc.js'
  ]
};
