import path from "path";
import { fileURLToPath } from "url";

const folder = path.dirname(fileURLToPath(import.meta.url));

export default {
  plugins: {
    tailwindcss: { config: path.join(folder, "tailwind.config.js") },
    autoprefixer: {},
  },
};