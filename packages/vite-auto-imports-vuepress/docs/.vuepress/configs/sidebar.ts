import type { SidebarOptions } from 'vuepress-theme-hope';
import guide from './sidebar/guide';

// 侧边栏配置 https://theme-hope.vuejs.press/zh/guide/layout/sidebar.html
export const sidebar: SidebarOptions = {
  '/guide/': guide,
};
