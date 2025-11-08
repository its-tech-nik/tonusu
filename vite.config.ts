import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // do not use@vitejs/plugin-react-swc... it is throwing errors when adding optimizeDeps.exclude
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  optimizeDeps: {
    exclude: ["@anaralabs/lector"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
