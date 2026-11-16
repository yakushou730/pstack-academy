import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'node_modules/**', 'public/**', 'src/content/generated.json'] },
  js.configs.recommended,
  { files: ['**/*.{js,ts,tsx}'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['**/*.{ts,tsx}'], languageOptions: { parser: tsParser }, plugins: { '@typescript-eslint': tsPlugin, 'react-hooks': hooks }, rules: {
    ...tsPlugin.configs.recommended.rules,
    'no-undef': 'off', 'no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error', 'react-hooks/exhaustive-deps': 'error',
  } },
];
