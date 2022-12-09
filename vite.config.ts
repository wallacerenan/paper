/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'vite'

import reactPlugin from '@vitejs/plugin-react'

const { readdirSync } = require('fs')

const path = require('path')

const srcPath = path.resolve(__dirname, './src')

const paths = {}

const dirs = readdirSync(srcPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

dirs.forEach(dir => {
  paths[dir] = path.resolve(srcPath, dir)
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: {
      ...paths,
    },
  },
})
