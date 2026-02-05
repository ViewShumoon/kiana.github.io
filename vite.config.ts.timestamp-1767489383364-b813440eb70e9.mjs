// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///D:/Projects/Vue/kiana.github.io/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Projects/Vue/kiana.github.io/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/Projects/Vue/kiana.github.io/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/Projects/Vue/kiana.github.io/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///D:/Projects/Vue/kiana.github.io/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_dirname = "D:\\Projects\\Vue\\kiana.github.io";
var vite_config_default = defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, process.cwd());
  const VITE_PORT = Number(envConfig.VITE_PORT);
  const VITE_API_URL = envConfig.VITE_API_URL;
  return {
    base: "/",
    server: {
      open: false,
      port: VITE_PORT,
      host: "0.0.0.0",
      //host: "localhost",
      cors: true,
      proxy: {
        "/api": {
          target: VITE_API_URL,
          //target: "http://localhost:6030/",
          ws: true,
          secure: false,
          changeOrigin: true,
          // 是否允许跨域代理
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: [
          "vue",
          "vue-router",
          {
            "naive-ui": [
              "useDialog",
              "useLoadingBar",
              "useMessage",
              "useNotification"
            ]
          }
          // {
          //     "draggable-vue-directive": ['Draggable']
          // }
        ],
        resolvers: [NaiveUiResolver()],
        dts: path.resolve(resolve("src/types/auto-imports.d.ts"))
      }),
      Components({
        extensions: ["vue", "md"],
        dirs: ["src/components", "src/views", "src/layouts"],
        resolvers: [NaiveUiResolver()],
        dts: "src/types/components.d.ts",
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        types: []
      })
    ],
    build: {
      sourcemap: true
    },
    resolve: {
      alias: {
        "@": resolve("./src"),
        "@assets": resolve("./src/assets"),
        "@types": resolve("./src/types"),
        "@components": resolve("./src/components"),
        "@views": resolve("./src/views"),
        "@services": resolve("./src/services"),
        "@routes": resolve("./src/routes"),
        "@api": resolve("./src/api"),
        "@stores": resolve("./src/stores"),
        "@utils": resolve("./src/utils")
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
      define: {
        __APP_ENV__: envConfig.APP_ENV,
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: false,
        __INTLIFY_PROD_DEVTOOLS__: false
      }
    }
  };
});
function resolve(p) {
  return path.resolve(__vite_injected_original_dirname, p);
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxWdWVcXFxca2lhbmEuZ2l0aHViLmlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxWdWVcXFxca2lhbmEuZ2l0aHViLmlvXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9WdWUva2lhbmEuZ2l0aHViLmlvL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcblxuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICAgIGNvbnN0IGVudkNvbmZpZyA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG5cbiAgICBjb25zdCBWSVRFX1BPUlQgPSBOdW1iZXIoZW52Q29uZmlnLlZJVEVfUE9SVCk7XG4gICAgY29uc3QgVklURV9BUElfVVJMID0gZW52Q29uZmlnLlZJVEVfQVBJX1VSTDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGJhc2U6IFwiL1wiLFxuICAgICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgcG9ydDogVklURV9QT1JULFxuICAgICAgICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgICAgICAgICAvL2hvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgICAgICAgICBjb3JzOiB0cnVlLFxuICAgICAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICAgICBcIi9hcGlcIjoge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IFZJVEVfQVBJX1VSTCxcbiAgICAgICAgICAgICAgICAgICAgLy90YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo2MDMwL1wiLFxuICAgICAgICAgICAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTUxNDFcdThCQjhcdThERThcdTU3REZcdTRFRTNcdTc0MDZcbiAgICAgICAgICAgICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICB2dWUoKSxcbiAgICAgICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFsvXFwuW3RqXXN4PyQvLCAvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXG4gICAgICAgICAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgICAgICAgICAgICBcInZ1ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcInZ1ZS1yb3V0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuYWl2ZS11aVwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VEaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZUxvYWRpbmdCYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZU1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZU5vdGlmaWNhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgXCJkcmFnZ2FibGUtdnVlLWRpcmVjdGl2ZVwiOiBbJ0RyYWdnYWJsZSddXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXSxcbiAgICAgICAgICAgICAgICBkdHM6IHBhdGgucmVzb2x2ZShyZXNvbHZlKFwic3JjL3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzXCIpKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogW1widnVlXCIsIFwibWRcIl0sXG4gICAgICAgICAgICAgICAgZGlyczogW1wic3JjL2NvbXBvbmVudHNcIiwgXCJzcmMvdmlld3NcIiwgXCJzcmMvbGF5b3V0c1wiXSxcbiAgICAgICAgICAgICAgICByZXNvbHZlcnM6IFtOYWl2ZVVpUmVzb2x2ZXIoKV0sXG4gICAgICAgICAgICAgICAgZHRzOiBcInNyYy90eXBlcy9jb21wb25lbnRzLmQudHNcIixcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxuICAgICAgICAgICAgICAgIHR5cGVzOiBbXSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgIFwiQFwiOiByZXNvbHZlKFwiLi9zcmNcIiksXG5cbiAgICAgICAgICAgICAgICBcIkBhc3NldHNcIjogcmVzb2x2ZShcIi4vc3JjL2Fzc2V0c1wiKSxcbiAgICAgICAgICAgICAgICBcIkB0eXBlc1wiOiByZXNvbHZlKFwiLi9zcmMvdHlwZXNcIiksXG4gICAgICAgICAgICAgICAgXCJAY29tcG9uZW50c1wiOiByZXNvbHZlKFwiLi9zcmMvY29tcG9uZW50c1wiKSxcbiAgICAgICAgICAgICAgICBcIkB2aWV3c1wiOiByZXNvbHZlKFwiLi9zcmMvdmlld3NcIiksXG4gICAgICAgICAgICAgICAgXCJAc2VydmljZXNcIjogcmVzb2x2ZShcIi4vc3JjL3NlcnZpY2VzXCIpLFxuICAgICAgICAgICAgICAgIFwiQHJvdXRlc1wiOiByZXNvbHZlKFwiLi9zcmMvcm91dGVzXCIpLFxuXG4gICAgICAgICAgICAgICAgXCJAYXBpXCI6IHJlc29sdmUoXCIuL3NyYy9hcGlcIiksXG4gICAgICAgICAgICAgICAgXCJAc3RvcmVzXCI6IHJlc29sdmUoXCIuL3NyYy9zdG9yZXNcIiksXG5cbiAgICAgICAgICAgICAgICBcIkB1dGlsc1wiOiByZXNvbHZlKFwiLi9zcmMvdXRpbHNcIiksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczogW1wiLm1qc1wiLCBcIi5qc1wiLCBcIi50c1wiLCBcIi5qc3hcIiwgXCIudHN4XCIsIFwiLmpzb25cIl0sXG4gICAgICAgICAgICBkZWZpbmU6IHtcbiAgICAgICAgICAgICAgICBfX0FQUF9FTlZfXzogZW52Q29uZmlnLkFQUF9FTlYsXG4gICAgICAgICAgICAgICAgX19WVUVfSTE4Tl9GVUxMX0lOU1RBTExfXzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXzogZmFsc2UsXG4gICAgICAgICAgICAgICAgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXzogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH07XG59KTtcblxuZnVuY3Rpb24gcmVzb2x2ZShwOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgcCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVSLE9BQU8sVUFBVTtBQUV4UyxTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFNBQVM7QUFFaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFFdkIsU0FBUyx1QkFBdUI7QUFSaEMsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDdEMsUUFBTSxZQUFZLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUU3QyxRQUFNLFlBQVksT0FBTyxVQUFVLFNBQVM7QUFDNUMsUUFBTSxlQUFlLFVBQVU7QUFFL0IsU0FBTztBQUFBLElBQ0gsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDSCxRQUFRO0FBQUEsVUFDSixRQUFRO0FBQUE7QUFBQSxVQUVSLElBQUk7QUFBQSxVQUNKLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQTtBQUFBLFVBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDaEQ7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osV0FBVztBQUFBLFFBQ1AsU0FBUyxDQUFDLGNBQWMsVUFBVSxjQUFjLE9BQU87QUFBQSxRQUN2RCxTQUFTO0FBQUEsVUFDTDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsWUFDSSxZQUFZO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJSjtBQUFBLFFBQ0EsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0FBQUEsUUFDN0IsS0FBSyxLQUFLLFFBQVEsUUFBUSw2QkFBNkIsQ0FBQztBQUFBLE1BQzVELENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNQLFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQSxRQUN4QixNQUFNLENBQUMsa0JBQWtCLGFBQWEsYUFBYTtBQUFBLFFBQ25ELFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUFBLFFBQzdCLEtBQUs7QUFBQSxRQUNMLFNBQVMsQ0FBQyxVQUFVLGNBQWMsT0FBTztBQUFBLFFBQ3pDLE9BQU8sQ0FBQztBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0w7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNILFdBQVc7QUFBQSxJQUNmO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxLQUFLLFFBQVEsT0FBTztBQUFBLFFBRXBCLFdBQVcsUUFBUSxjQUFjO0FBQUEsUUFDakMsVUFBVSxRQUFRLGFBQWE7QUFBQSxRQUMvQixlQUFlLFFBQVEsa0JBQWtCO0FBQUEsUUFDekMsVUFBVSxRQUFRLGFBQWE7QUFBQSxRQUMvQixhQUFhLFFBQVEsZ0JBQWdCO0FBQUEsUUFDckMsV0FBVyxRQUFRLGNBQWM7QUFBQSxRQUVqQyxRQUFRLFFBQVEsV0FBVztBQUFBLFFBQzNCLFdBQVcsUUFBUSxjQUFjO0FBQUEsUUFFakMsVUFBVSxRQUFRLGFBQWE7QUFBQSxNQUNuQztBQUFBLE1BQ0EsWUFBWSxDQUFDLFFBQVEsT0FBTyxPQUFPLFFBQVEsUUFBUSxPQUFPO0FBQUEsTUFDMUQsUUFBUTtBQUFBLFFBQ0osYUFBYSxVQUFVO0FBQUEsUUFDdkIsMkJBQTJCO0FBQUEsUUFDM0IseUJBQXlCO0FBQUEsUUFDekIsMkJBQTJCO0FBQUEsTUFDL0I7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7QUFFRCxTQUFTLFFBQVEsR0FBVztBQUN4QixTQUFPLEtBQUssUUFBUSxrQ0FBVyxDQUFDO0FBQ3BDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
