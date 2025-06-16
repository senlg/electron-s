import './assets/main.css'
import 'virtual:uno.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')


import React from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('app')as HTMLElement );
root.render(<React.StrictMode>
    {"hello world"}
</React.StrictMode>);