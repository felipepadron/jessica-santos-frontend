import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TestPage from './pages/TestPage'

// App mínimo para debug
function DebugApp() {
  console.log('DebugApp renderizando...')

  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f8f9fa' }}>
          <h1>🔍 Debug App - ERP Jéssica Santos</h1>
          <div style={{ marginTop: '10px' }}>
            <Link to="/" style={{ marginRight: '20px', color: '#007bff' }}>Home</Link>
            <Link to="/test" style={{ color: '#007bff' }}>Teste</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h2>🏠 Home Debug</h2>
              <p>Aplicação mínima funcionando!</p>
              <p>Navegue para <Link to="/test">Teste</Link> para verificar roteamento.</p>
            </div>
          } />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={
            <div>
              <h2>❌ Página não encontrada</h2>
              <Link to="/">Voltar ao início</Link>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default DebugApp

