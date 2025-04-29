// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'

export default antfu(
  {
    react: true,
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
  {
    ignores: ['.next/*', 'components/ui'],
  },
)
