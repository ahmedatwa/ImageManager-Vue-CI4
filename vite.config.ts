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
    //root: resolve(__dirname, './src'),
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
      outDir: "./dist/imagemanager-js",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
      },
    },
    plugins: [vue()],
    define: {
      __APP_NAME__: JSON.stringify(env.VITE_APP_NAME),
      __APP_ENDPOINT__: JSON.stringify(env.VITE_APP_ENDPOINT),
      __CI_TOKEN_QUERY__: JSON.stringify(env.VITE_APP_CI_TOKEN_PARAM),
      __CI_THUMB_QUERY__: JSON.stringify(env.VITE_APP_CI_THUMB_PARAM),
      __CI_INPUT_QUERY__: JSON.stringify(env.VITE_APP_CI_INPUT_PARAM),
      __APP_VERSION__: JSON.stringify("v1.2.1")
    },
    server: {
      proxy: {
        "/api": "http://localhost:4567",
      },
    },
  };
});
