import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        {
          from: "vue-router",
          imports: [
            "RouteRecordRaw",
            "RouteLocationRaw",
            "RouteLocationNormalized",
            "RouteRecordName",
            "RouteParamsRaw",
            "LocationQueryRaw",
          ],
          type: true,
        },
        "pinia",
      ],
      dirs: ["src/util/**", "src/hooks/**", "src/store/**", "src/constant/**", "!src/constant/el-component-props/**"],
      dts: "typings/auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
