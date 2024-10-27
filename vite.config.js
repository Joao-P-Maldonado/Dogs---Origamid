import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Hooks
      "@Api": path.resolve(__dirname, "./src/api"),
      "@Context": path.resolve(__dirname, "./src/global/context"),
      "@Hooks": path.resolve(__dirname, "./src/global/hooks"),
      // Styles
      "@Assets": path.resolve(__dirname, "./src/assets"),
      "@CssPages": path.resolve(__dirname, "./src/assets/pages/styles"),
      // Pages
      "@Public": path.resolve(__dirname, "./src/pages/public"),
      "@Private": path.resolve(__dirname, "./src/pages/auth"),
      "@Views": path.resolve(__dirname, "./src/components/views"),
      // Components
      "@Components": path.resolve(__dirname, "./src/Components"),
      "@Modals": path.resolve(__dirname, "./src/Components/modals"),
    },
  },
});
