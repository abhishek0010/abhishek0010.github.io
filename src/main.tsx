import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle GitHub Pages SPA redirect
// This works in conjunction with 404.html to preserve routes
;(function() {
  const params = new URLSearchParams(window.location.search)
  const redirectPath = params.get('p')
  if (redirectPath) {
    const query = params.get('q')
    const newUrl = redirectPath + (query ? '?' + query : '') + window.location.hash
    window.history.replaceState(null, '', newUrl)
  }
})()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
