# vite-auto-imports-vuepress

这是一个 `vite-auto-import` 在 `vuepress` 中无法生效的 bug 返回 demo


## 使用指南

### 文件位置

1. `src/components/HelloWorld.vue` 是演示自动导入使用的位置。
2. `src/util/string/string-utils.ts` 是一个自动导入的工具类，这个工具类会在 `HelloWorld.vue` 中使用



### 在 VUE 项目中可以正常使用

1. 运行 `pnpm dev` 启动项目
2. 访问 `http://localhost:5173/` 访问地址，页面中会存在输入框和按键，就是调用了 `HelloWorld.vue`
3. 点击里面的按钮 `请点击这个按钮` 输出结果会变为 `www.domain`


### 在 VUEPress 项目中无法正常使用

1. 运行 `pnpm docs:dev` 启动项目
2. 访问 `http://localhost:5174/basic-paper-cloud-docs/guide/` 访问地址
3. 点击里面的按钮 `请点击这个按钮` 输出结果没有变化，并且控制台会有以下异常

```
runtime-core.esm-bundler.js:51 [Vue warn]: Unhandled error during execution of native event handler 
  at <HelloWorld msg="这是一个测试组件" > 
  at <AsyncComponentWrapper msg="这是一个测试组件" > 
  at <ClientOnly> 
  at <SpVueDemo> 
  at <AsyncComponentWrapper> 
  at <Index.html onVnodeMounted=fn<onVnodeMounted> onVnodeUpdated=fn<onVnodeUpdated> onVnodeBeforeUnmount=fn<onVnodeBeforeUnmount>  ... > 
  at <Content ref=Ref< 
Proxy(Object) {…}
 > class="theme-hope-content" vp-content="" > 
  at <MarkdownContent> 
  at <N> 
  at <NormalPage key="/guide/" > 
  at <BaseTransition mode="out-in" onBeforeEnter=fn<onBeforeEnter> onBeforeLeave=fn<pending>  ... > 
  at <Transition name="fade-slide-y" mode="out-in" onBeforeEnter=fn<resolve>  ... > 
  at <FadeSlideY> 
  at <N> 
  at <CommonWrapper > 
  at <Layout> 
  at <Vuepress>

runtime-core.esm-bundler.js:268 Uncaught ReferenceError: stringUtils is not defined
    at clickHandler (HelloWorld.vue:10:15)
    at callWithErrorHandling (runtime-core.esm-bundler.js:199:19)
    at callWithAsyncErrorHandling (runtime-core.esm-bundler.js:206:17)
    at HTMLButtonElement.invoker (runtime-dom.esm-bundler.js:729:5)
```