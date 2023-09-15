import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "",
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@assets": resolve(__dirname, "./src/assets"),
        "@components": resolve(__dirname, "./src/components"),
        "@stores": resolve(__dirname, "./src/stores"),
        "@views": resolve(__dirname, "./src/views"),
      },
    },
    build: {
      outDir: './dist/filemanager-js',
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
      },
    },
    plugins: [vue()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __APP_NAME__: JSON.stringify("Filemanager"),
      __APP_VERSION__: JSON.stringify("v1.2.1"),
      __API_URL__: JSON.stringify("http://localhost/project-root/public/api/filemanager"),
      __CI_TOKEN__: JSON.stringify("usertoken"),
      __CI_THUMB__: JSON.stringify("thumb"),
      __CI_INPUT__: JSON.stringify("input")
    },
  };
});
