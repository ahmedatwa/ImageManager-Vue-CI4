import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ command, mode }) => {
  
// Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    base: "",
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src/"),
        '@assets': resolve(__dirname, './src/assets'),
        '@components': resolve(__dirname, './src/components'),
        '@stores': resolve(__dirname, './src/stores'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },  
    plugins: [vue()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __APP_NAME__: JSON.stringify('Filemanager'),
      __APP_VERSION__: JSON.stringify('v1.2'),
      __API_URL__: JSON.stringify("http://localhost/project-root/public/filemanager"),
    },
  }
})
