import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ВАЖНО: верните импорт ваших глобальных стилей
import './assets/styles.css'          // или './assets/main.css' / './assets/tailwind.css'

createApp(App).use(router).mount('#app')