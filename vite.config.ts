import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@/components": path.resolve(__dirname, "./client/components"),
      "@/lib": path.resolve(__dirname, "./client/lib"),
      "@/hooks": path.resolve(__dirname, "./client/hooks"),
    },
  },
  build: {
    outDir: "dist"
  },
  server: {
    port: 5173,
    strictPort: true,
  }
});