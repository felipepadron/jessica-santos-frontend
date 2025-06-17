import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  AlertTriangle,
  Check
} from 'lucide-react'
import { authService } from '@/services'

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Verificar se já está logado
  useEffect(() => {
    if (authService.isAuthenticated()) {
      onLogin(true)
    }
  }, [onLogin])

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await authService.login(credentials.email, credentials.password)

      if (result.success) {
        onLogin(true)
      } else {
        setError(result.message || 'Erro ao fazer login')
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Jéssica Santos Fotografia
          </h1>
          <p className="text-gray-600 mt-2">
            Painel Administrativo
          </p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <LogIn className="w-5 h-5" />
              <span>Login Administrativo</span>
            </CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o painel
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Erro */}
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Formulário */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      email: e.target.value
                    })}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite seu email"
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      password: e.target.value
                    })}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua senha"
                    className="pl-10 pr-10"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Botão de Login */}
            <Button 
              onClick={handleLogin}
              disabled={loading || !credentials.email || !credentials.password}
              className="w-full bg-rose-600 hover:bg-rose-700"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Entrar</span>
                </div>
              )}
            </Button>

            {/* Informações de Acesso */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Credenciais de demonstração:
              </p>
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  jessica@jessicasantos.com / admin123
                </Badge>
              </div>
            </div>

            {/* Recursos de Segurança */}
            <div className="text-center pt-4 border-t">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>JWT Seguro</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="w-3 h-3" />
                  <span>API Integrada</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 Jéssica Santos Fotografia</p>
          <p>Sistema integrado com backend</p>
        </div>
      </div>
    </div>
  )
}

export default Login

