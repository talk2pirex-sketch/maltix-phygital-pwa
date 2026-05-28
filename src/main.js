import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registered:', registration)
    }).catch(err => {
      console.log('ServiceWorker registration failed:', err)
    })
  })
}

const app = createApp(App)
app.mount('#app')
