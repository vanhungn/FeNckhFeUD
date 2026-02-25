import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚙️ Cấu hình đầy đủ tương thích Chakra UI 3.x
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@chakra-ui/react", "@emotion/react", "@emotion/styled", "framer-motion"],
  },

});
