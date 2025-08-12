import './assets/main.css'
import 'virtual:uno.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')


import React from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './router'
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<React.StrictMode>
    <Router>
    </Router>
</React.StrictMode>);