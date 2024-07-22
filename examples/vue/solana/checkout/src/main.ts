// main.js or main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { Buffer } from 'buffer'
import process from 'process'

window.Buffer = Buffer
window.process = process

createApp(App).mount('#app')
