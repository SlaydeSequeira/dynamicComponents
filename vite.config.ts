import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project sites are served from /repo-name/
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
});
