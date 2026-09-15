import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fullstackopen-production-8d66.up.railway.app",
        changeOrigin: true,
      },
    },
  },
});
