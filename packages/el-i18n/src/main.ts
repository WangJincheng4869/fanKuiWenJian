import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './config/i18n'
import 'element-plus/dist/index.css'
// import { ElMessageBox } from 'element-plus'

const app = createApp(App)

app.use(router).use(i18n)

// app.use(ElMessageBox)

app.mount('#app')
