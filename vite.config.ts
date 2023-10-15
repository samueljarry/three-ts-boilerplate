import { defineConfig } from "vite";
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@proxies': path.resolve(__dirname, './src/proxies/'),
      '@commands': path.resolve(__dirname, './src/commands/'),
      '@views': path.resolve(__dirname, './src/views/'),
      '@constants': path.resolve(__dirname, './src/constants/'),
      '@managers': path.resolve(__dirname, './src/managers/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
    }
  }
})