import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite"; // ✅ This line is missing

export default defineConfig({
  plugins: [react()],
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
