import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite"; // ✅ This line is missing
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "College Companion",
        short_name: "Companion",
        description:
          "Ydour smart digital buddy for campus life—organized, informed, and always ready to help.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#003366",
        icons: [
          {
            src: "/icon.jpg",
            sizes: "192x192",
            type: "image/jpg",
          },
          {
            src: "/icon.jpg",
            sizes: "512x512",
            type: "image/jpg",
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: false,
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  root: "./",
  build: {
    outDir: "dist",
  },
});
