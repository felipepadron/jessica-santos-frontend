import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from './contexts/ConfigContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AccessButton from './components/AccessButton'
import Login from './components/Login'
import Home from './pages/Home'
import './App.css'

// Lazy loading das páginas pesadas
const Dashboard = lazy(() => import('./pages/Dashboard'))
const AgendamentosPage = lazy(() => import('./pages/AgendamentosPage'))
const ConfiguracoesPagamentos = lazy(() => import('./pages/ConfiguracoesPagamentos'))
const RelatoriosAvancados = lazy(() => import('./pages/RelatoriosAvancados'))
const CentralNotificacoes = lazy(() => import('./pages/CentralNotificacoes'))
const EmailMarketing = lazy(() => import('./pages/EmailMarketing'))
const SetupWhatsApp = lazy(() => import('./pages/SetupWhatsApp'))
const EditorTemplates = lazy(() => import('./pages/EditorTemplates'))

// Páginas leves carregadas normalmente
import Servicos from './pages/Servicos'
import Agendamento from './pages/Agendamento'
import Galeria from './pages/Galeria'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import ConfiguracaoSistema from './pages/ConfiguracaoSistema'
import AreaCliente from './pages/AreaCliente'
import ClientArea from './pages/ClientArea'
import GestaoPlanos from './pages/GestaoPlanos'

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-js-primary"></div>
  </div>
)

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  // Verificar se está logado
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('jessica_admin_logged')
    const loginTime = localStorage.getItem('jessica_admin_login_time')
    
    if (isLoggedIn && loginTime) {
      const now = new Date().getTime()
      const loginTimestamp = parseInt(loginTime)
      const hoursPassed = (now - loginTimestamp) / (1000 * 60 * 60)
      
      if (hoursPassed < 24) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('jessica_admin_logged')
        localStorage.removeItem('jessica_admin_login_time')
      }
    }
  }, [])

  // Componente para rotas protegidas
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />
  }

  return (
    <ConfigProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <AccessButton />
                <Footer />
              </>
            } />
            
            <Route path="/servicos" element={
              <>
                <Navbar />
                <Servicos />
                <Footer />
              </>
            } />
            
            <Route path="/agendamento" element={
              <>
                <Navbar />
                <Agendamento />
                <Footer />
              </>
            } />
            
            <Route path="/galeria" element={
              <>
                <Navbar />
                <Galeria />
                <Footer />
              </>
            } />
            
            <Route path="/sobre" element={
              <>
                <Navbar />
                <Sobre />
                <Footer />
              </>
            } />
            
            <Route path="/contato" element={
              <>
                <Navbar />
                <Contato />
                <Footer />
              </>
            } />

            {/* Login administrativo */}
            <Route 
              path="/admin/login" 
              element={<Login setIsAuthenticated={setIsAuthenticated} />} 
            />

            {/* Rotas administrativas protegidas com lazy loading */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/agendamentos" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AgendamentosPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/configuracoes-pagamentos" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ConfiguracoesPagamentos />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/relatorios-avancados" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <RelatoriosAvancados />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/central-notificacoes" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <CentralNotificacoes />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/email-marketing" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <EmailMarketing />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/setup-whatsapp" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <SetupWhatsApp />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/editor-templates" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <EditorTemplates />
                  </Suspense>
                </ProtectedRoute>
              } 
            />

            {/* Rotas administrativas leves (sem lazy loading) */}
            <Route 
              path="/configuracao-sistema" 
              element={
                <ProtectedRoute>
                  <ConfiguracaoSistema />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/gestao-planos" 
              element={
                <ProtectedRoute>
                  <GestaoPlanos />
                </ProtectedRoute>
              } 
            />

            {/* Área do cliente */}
            <Route path="/area-cliente" element={<AreaCliente />} />
            <Route path="/client-area/:token" element={<ClientArea />} />

            {/* Redirect padrão */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  )
}

export default App

