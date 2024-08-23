/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--el-color-primary)',
      },
      fontSize: {
        base: 'var(--el-font-size-base)',
        sm: 'var(--el-font-size-small)',
        xm: 'var(--el-font-size-extra-small)',
        md: 'var(--el-font-size-medium)',
        lg: 'var(--el-font-size-large)',
        xl: 'var(--el-font-size-extra-large)',
      },
      spacing: {
        default: 'var(--sp-space-wrap-default)',
      },
      borderColor: {
        lighter: 'var(--el-border-color-lighter)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // 禁用响应式容器功能，即container类
    container: false,
  },
};
