import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'film-portfolio'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? `/${repoName}/` : '/',
}))
