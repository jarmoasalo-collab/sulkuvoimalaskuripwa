import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // TÄRKEÄ: Laita tähän GitHub-repositoriosi nimi kauttaviivoilla
  base: '/sulkuvoimalaskuripwa/', 
})