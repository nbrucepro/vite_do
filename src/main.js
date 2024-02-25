import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from './stores/main'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')

const mainStore = useMainStore(pinia)

const defaultDocumentTitle = 'Abridge To do'

router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
