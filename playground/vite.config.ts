import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { createLogger, defineConfig } from "vite";

// Suppress warnings from Rolldown Vite
// This is due to compatibility issues with Vite and Rolldown Vite.
const logger = createLogger();
logger.warn = () => {};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  customLogger: logger,
  resolve: {
    alias: {
      '@matechat/react': path.resolve(__dirname, "../src"),
    }
  }
});
