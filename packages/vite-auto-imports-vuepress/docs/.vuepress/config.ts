import { viteBundler } from "@vuepress/bundler-vite";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { statSync } from "fs";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import { type UserConfig, defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { navbar } from "./configs/navbar";
import { sidebar } from "./configs/sidebar";

export default defineUserConfig({
  host: "0.0.0.0",
  port: 5174,
  base: "/basic-paper-cloud-docs/",
  lang: "zh-CN",
  title: "BasicPaperCloud",
  description: "BasicPaperCloud 前后端分离开发文档",
  alias: {
    "@": resolve(__dirname, "../../src"),
  },
  bundler: viteBundler({
    viteOptions: {
      plugins: [
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
          ],
          dirs: [
            resolve(__dirname, "../../src/util/**"),
            resolve(__dirname, "../../src/hooks/**"),
            resolve(__dirname, "../../src/store/**"),
            resolve(__dirname, "../../src/constant/**"),
            "!/**/constant/el-component-props/**",
          ],
          dts: resolve(__dirname, "../../typings/auto-imports.d.ts"),
        }),
      ],
      ssr: {
        /**
         * 由于在 build 时会报错 SyntaxError: Named export 'createI18n' not found.
         * The requested module 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js' is a CommonJS module, which may not support all module.exports as named exports.
         * 所以要添加以下配置。详见：https://vite-plugin-ssr.com/common-issues 与 https://vite-plugin-ssr.com/invalid-esm#solution
         */
        noExternal: ["@vueuse/core"],
      },
      build: {
        rollupOptions: {
          external: [
            new RegExp("/src/router/.*"),
          ],
        },
      },
    },
  }),
  theme: hopeTheme({
    navbar,
    sidebar,
    lastUpdated: true,
    hostname: "https://wxspirit.simperfect.com/basic-paper-cloud-docs/",
    markdown: {
      alert: true,
      mark: true,
      mermaid: true,
      codeTabs: true,
      include: {
        deep: true,
        useComment: true,
        resolveImagePath: true,
        resolveLinkPath: true,
      },
      highlighter: {
        type: "shiki",
        themes: {
          dark: "dark-plus",
          light: "light-plus",
        },
        notationDiff: true,
        highlightLines: true,
        lineNumbers: true,
        langs: [
          "java",
          "javascript",
          "typescript",
          "html",
          "css",
          "json",
          "yaml",
          "markdown",
          "xml",
          "bat",
          "shell",
          "powershell",
          "sql",
          "properties",
          "md",
          "vue",
          "tsx",
          "jsx",
          "scss",
          "less",
          "sass",
          "vue-html",
          "nginx",
          "text",
        ],
      },
    },
    plugins: {
      copyCode: {
        showInMobile: true,
      },
      slimsearch: {
        indexContent: true,
        suggestion: false,
        queryHistoryCount: 8,
        resultHistoryCount: 8,
        locales: {
          "/": {
            placeholder: "搜索文档",
            search: "搜索文档",
          },
        },
      },
      // 网站地图 (Sitemap) 提供搜索引擎优化 (SEO) https://plugin-sitemap2.vuejs.press/zh/
      sitemap: {
        changefreq: "daily",
        modifyTimeGetter: (page) => {
          if (page.filePathRelative == null) {
            return new Date().toISOString();
          }
          return statSync(resolve(__dirname, "../" + page.filePathRelative)).mtime.toISOString();
        },
      },
    },
  }),
  plugins: [
    // 根据组件文件或目录自动注册 Vue 组件 https://ecosystem.vuejs.press/zh/plugins/tools/register-components.html
    registerComponentsPlugin({
      components: {
        SpVueDemo: resolve(__dirname, "./components/sp-code-demo/SpVueDemo.vue"),
        SpColorDemo: resolve(__dirname, "./components/sp-color-demo/SpColorDemo.vue"),
        SpDetailsPopover: resolve(__dirname, "./components/sp-details-popover/SpDetailsPopover.vue"),
      },
      componentsDir: resolve(__dirname, "../../src/components"),
      componentsPatterns: ["**/*.vue", "!**/sp-editor/*.*"],
    }),
  ],
}) as UserConfig;
