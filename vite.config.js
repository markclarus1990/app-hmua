import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "hmua",
  server: {
    host: "0.0.0.0", // Allow external devices to access the dev server
    port: 5174, // Ensure this matches the port you're using
  },
});