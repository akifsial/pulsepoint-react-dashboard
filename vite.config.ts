import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"),
      "@types": resolve(__dirname, "src/types"),
      "@components": resolve(__dirname, "src/Components"),
      "@pages": resolve(__dirname, "src/Pages"),
      "@assets": resolve(__dirname, "src/assets"),
      "@layouts": resolve(__dirname, "src/Layouts"),
      "@routes": resolve(__dirname, "src/Routes"),
      "@styles": resolve(__dirname, "src/styles"),
    },
  },
});
