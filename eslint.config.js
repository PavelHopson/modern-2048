import js from '@eslint/js';
import globals from 'globals';

export default [
  // Базовая конфигурация ESLint
  js.configs.recommended,
  
  // Настройки для браузера и ES2021
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    
    // Правила
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-var': 'error',
      'prefer-const': 'error',
      'arrow-spacing': ['error', { before: true, after: true }]
    }
  },
  
  // Конфигурация для файлов в папке src
  {
    files: ['src/**/*.js'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  }
];