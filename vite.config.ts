import { defineConfig } from "vite";

export default defineConfig({
  root: "public", // Falls index.html in public liegt
  build: {
    outDir: "../dist",
  },
});