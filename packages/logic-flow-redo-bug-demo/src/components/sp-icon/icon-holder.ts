import type { Component } from "vue";

/**
 * 图标数据管理类
 */
class IconHolder {
  private static readonly ICON_MAP: Record<string, Component> = {};

  init() {
    let svgRecord: Record<string, Component> = import.meta.glob(['@/assets/icon/*.svg'], {
      query: 'component',
      eager: true,
    });

    for (const key in svgRecord) {
      IconHolder.ICON_MAP[key.replace(/.*\/assets\/icon\/(.*).svg/, '$1')] = svgRecord[key];
    }
  }

  getIcon(name: string) {
    return IconHolder.ICON_MAP[name];
  }
}

export const iconHolder = new IconHolder();
