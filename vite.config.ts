import { defineConfig } from "vite";
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@bases': path.resolve(__dirname, './src/bases/'),
      '@proxies': path.resolve(__dirname, './src/proxies/'),
      '@commands': path.resolve(__dirname, './src/commands/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@constants': path.resolve(__dirname, './src/constants/'),
      '@managers': path.resolve(__dirname, './src/managers/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@loaders': path.resolve(__dirname, './src/loaders/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
    }
  }
})