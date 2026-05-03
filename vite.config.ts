/**
 * Configuração do Vite (servidor de dev + build de produção).
 * · server.port → 8080 (npm run dev abre nesta porta).
 * · resolve.alias @ → pasta src/ (imports como @/components/...).
 * · build.rollupOptions.manualChunks → separa vendor/query em arquivos próprios (cache).
 * Documentação: https://vitejs.dev/config/
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/cyberdesk-hub/" : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          query: ["@tanstack/react-query"],
        },
      },
    },
  },
});
