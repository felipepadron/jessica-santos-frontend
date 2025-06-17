import React from 'react'
import ReactDOM from 'react-dom/client'
import DebugApp from './DebugApp.jsx'

console.log('🔍 Iniciando Debug App...')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DebugApp />
  </React.StrictMode>,
)

console.log('✅ Debug App renderizado!')

