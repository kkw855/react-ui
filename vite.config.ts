/// <reference types="vitest/config" />
import path from 'node:path'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json' with { type: 'json' }

const dirname = import.meta.dirname

const deps = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
]

const config = defineConfig({
  plugins: [
    tailwindcss(),
    viteReact(),
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.json',
      include: ['src'],
      bundleTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      // react, react-dom, react/jsx-runtime, @base-ui/react/button 같은 하위 경로까지 전부 external
      external: (id) => deps.some((d) => id === d || id.startsWith(`${d}/`)),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
})
export default config
