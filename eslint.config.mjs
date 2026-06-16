import { defineConfig } from 'eslint/config'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig(
  {
    // Lint the Kept app only. The repo root also holds BMAD framework scaffolding
    // (_bmad, .claude skills, planning/design artifacts) that ships its own scripts
    // and is not part of the application source — keep it out of the app's lint scope.
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/out',
      '_bmad/**',
      '_bmad-output/**',
      '.claude/**',
      'design-artifacts/**',
      'docs/**',
      'build/**',
      'resources/**',
      'imports/**'
    ]
  },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules
    }
  },
  eslintConfigPrettier
)
