import React from 'react'

// Componente de teste mínimo para debug
export default function TestPage() {
  console.log('TestPage renderizando...')
  
  React.useEffect(() => {
    console.log('TestPage useEffect executado')
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🧪 Página de Teste - Debug</h1>
      <p>Se você está vendo esta página, o React está funcionando!</p>
      <p>Timestamp: {new Date().toISOString()}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Testes Básicos:</h2>
        <ul>
          <li>✅ React renderizando</li>
          <li>✅ JavaScript executando</li>
          <li>✅ CSS aplicado</li>
          <li>✅ useEffect funcionando</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => {
            console.log('Botão clicado!')
            alert('JavaScript funcionando!')
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Testar JavaScript
        </button>
      </div>
    </div>
  )
}

