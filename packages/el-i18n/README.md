# el-i18n

ElMessageBox 与 vueI18n 组合导致无法弹出的 bug

1. 在 `APP.vue` 中编写了弹窗逻辑，并调用了 `HelloWorld.vue` 组件
2. 在 `HelloWorld.vue` 组件中使用 `$t`



将 `ElMessageBox` 全局注册后就可以正常弹出，在 main 中已经注释掉了