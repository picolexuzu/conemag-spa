import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Proxy assets served by Lovable's CDN (/__l5e/*) so they resolve during
// local `vite dev` and `vite preview` after `npm run build`.
const LOVABLE_ASSETS_ORIGIN = "https://conemag-spa.lovable.app";

const assetsProxy = {
  "/__l5e": {
    target: LOVABLE_ASSETS_ORIGIN,
    changeOrigin: true,
    secure: true,
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
    proxy: assetsProxy,
  },
  preview: {
    host: "::",
    port: 8080,
    proxy: assetsProxy,
  },
  build: {
    outDir: "dist",
  },
});
