import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: 'zh-CN',
  messages: {
    en: {
      message: {
        hello: 'hello world'
      }
    },
    'zh-CN': {
      message: {
        hello: '你好世界'
      }
    }
  }
})