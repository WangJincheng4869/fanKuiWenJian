import './tailwind.css';
import './assets/main.scss'
import 'element-plus/dist/index.css'
import './components/card/sp-card.scss'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { iconHolder } from './components/sp-icon/icon-holder'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
// 加载全部图标
iconHolder.init();
app.mount('#app')
