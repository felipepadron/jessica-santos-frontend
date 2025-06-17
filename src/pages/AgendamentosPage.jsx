import React, { useState, useEffect } from 'react'
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter,
  Clock,
  User,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  Camera
} from 'lucide-react'
import { 
  CardPremium, 
  HeadingPremium, 
  ContainerLuxury,
  BadgePremium,
  IconContainerPremium,
  ButtonPremium,
  useAnimations 
} from '../components/ui/PremiumComponents'
import CalendarioAgendamento from '../components/CalendarioAgendamento'
import agendamentoService from '../services/agendamentoService'

const AgendamentosPage = () => {
  const [agendamentos, setAgendamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos')
  const [busca, setBusca] = useState('')
  const [showCalendario, setShowCalendario] = useState(false)
  const animations = useAnimations()

  useEffect(() => {
    carregarAgendamentos()
  }, [])

  const carregarAgendamentos = async () => {
    try {
      setLoading(true)
      const response = await agendamentoService.listar()
      setAgendamentos(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
      // Dados simulados para demonstração
      setAgendamentos([
        {
          id: 1,
          cliente: 'Ana Silva',
          tipoEnsaio: 'Gestante',
          data: '2025-06-20',
          horario: '14:00',
          local: 'Estúdio Principal',
          valor: 550,
          status: 'confirmado',
          observacoes: '7 meses de gestação'
        },
        {
          id: 2,
          cliente: 'Maria Santos',
          tipoEnsaio: 'Newborn',
          data: '2025-06-22',
          horario: '10:00',
          local: 'Estúdio Principal',
          valor: 850,
          status: 'agendado',
          observacoes: 'Bebê de 15 dias'
        },
        {
          id: 3,
          cliente: 'Carla Mendes',
          tipoEnsaio: 'Família',
          data: '2025-06-25',
          horario: '16:00',
          local: 'Parque Ibirapuera',
          valor: 750,
          status: 'realizado',
          observacoes: 'Ensaio externo'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const agendamentosFiltrados = agendamentos.filter(agendamento => {
    const matchFiltro = filtro === 'todos' || agendamento.status === filtro
    const matchBusca = agendamento.cliente.toLowerCase().includes(busca.toLowerCase()) ||
                      agendamento.tipoEnsaio.toLowerCase().includes(busca.toLowerCase())
    return matchFiltro && matchBusca
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado': return 'gold'
      case 'agendado': return 'blue'
      case 'realizado': return 'green'
      case 'cancelado': return 'red'
      default: return 'neutral'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmado': return CheckCircle
      case 'agendado': return Clock
      case 'realizado': return CheckCircle
      case 'cancelado': return AlertCircle
      default: return Clock
    }
  }

  return (
    <ContainerLuxury className="min-h-screen bg-gradient-to-br from-js-neutral-50 to-js-gold-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <HeadingPremium level={1} className="text-3xl mb-2">
                Agendamentos
              </HeadingPremium>
              <p className="text-js-neutral-600">
                Gerencie todos os seus ensaios fotográficos
              </p>
            </div>
            <div className="flex gap-3">
              <ButtonPremium 
                variant="outline" 
                onClick={() => setShowCalendario(!showCalendario)}
              >
                <Calendar className="w-4 h-4" />
                {showCalendario ? 'Lista' : 'Calendário'}
              </ButtonPremium>
              <ButtonPremium variant="primary">
                <Plus className="w-4 h-4" />
                Novo Agendamento
              </ButtonPremium>
            </div>
          </div>

          {/* Filtros e Busca */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-js-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por cliente ou tipo de ensaio..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-js-neutral-200 rounded-xl focus:ring-2 focus:ring-js-gold-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['todos', 'agendado', 'confirmado', 'realizado'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFiltro(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filtro === status
                      ? 'bg-js-gold-500 text-white'
                      : 'bg-white text-js-neutral-600 hover:bg-js-gold-50'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        {showCalendario ? (
          /* Visualização em Calendário */
          <CardPremium className="p-6">
            <div className="mb-6">
              <HeadingPremium level={2} className="text-xl mb-2">
                Calendário de Agendamentos
              </HeadingPremium>
              <p className="text-js-neutral-600">
                Visualize seus ensaios em formato de calendário
              </p>
            </div>
            <CalendarioAgendamento />
          </CardPremium>
        ) : (
          /* Visualização em Lista */
          <div className="space-y-4">
            {loading ? (
              <CardPremium className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-js-gold-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-js-neutral-600">Carregando agendamentos...</p>
              </CardPremium>
            ) : agendamentosFiltrados.length === 0 ? (
              <CardPremium className="p-8 text-center">
                <Calendar className="w-12 h-12 text-js-neutral-400 mx-auto mb-4" />
                <HeadingPremium level={3} className="text-lg mb-2">
                  Nenhum agendamento encontrado
                </HeadingPremium>
                <p className="text-js-neutral-600 mb-4">
                  {busca || filtro !== 'todos' 
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece criando seu primeiro agendamento'
                  }
                </p>
                <ButtonPremium variant="primary">
                  <Plus className="w-4 h-4" />
                  Novo Agendamento
                </ButtonPremium>
              </CardPremium>
            ) : (
              agendamentosFiltrados.map((agendamento, index) => {
                const StatusIcon = getStatusIcon(agendamento.status)
                return (
                  <CardPremium 
                    key={agendamento.id} 
                    className={`p-6 hover:shadow-lg transition-all duration-200 ${animations.fadeInUp}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <IconContainerPremium variant="gold" size="lg">
                          <StatusIcon className="w-5 h-5" />
                        </IconContainerPremium>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <HeadingPremium level={3} className="text-lg">
                              {agendamento.cliente}
                            </HeadingPremium>
                            <BadgePremium variant={getStatusColor(agendamento.status)}>
                              {agendamento.status}
                            </BadgePremium>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-js-neutral-600">
                            <div className="flex items-center gap-2">
                              <Camera className="w-4 h-4" />
                              {agendamento.tipoEnsaio}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(agendamento.data).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {agendamento.horario}
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              R$ {agendamento.valor}
                            </div>
                          </div>
                          
                          {agendamento.local && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-js-neutral-600">
                              <MapPin className="w-4 h-4" />
                              {agendamento.local}
                            </div>
                          )}
                          
                          {agendamento.observacoes && (
                            <div className="mt-2 text-sm text-js-neutral-600">
                              <strong>Obs:</strong> {agendamento.observacoes}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <ButtonPremium variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </ButtonPremium>
                        <ButtonPremium variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </ButtonPremium>
                        <ButtonPremium variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </ButtonPremium>
                      </div>
                    </div>
                  </CardPremium>
                )
              })
            )}
          </div>
        )}

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <CardPremium className="p-4 text-center">
            <div className="text-2xl font-bold text-js-gold-600 mb-1">
              {agendamentos.filter(a => a.status === 'agendado').length}
            </div>
            <div className="text-sm text-js-neutral-600">Agendados</div>
          </CardPremium>
          
          <CardPremium className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {agendamentos.filter(a => a.status === 'confirmado').length}
            </div>
            <div className="text-sm text-js-neutral-600">Confirmados</div>
          </CardPremium>
          
          <CardPremium className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {agendamentos.filter(a => a.status === 'realizado').length}
            </div>
            <div className="text-sm text-js-neutral-600">Realizados</div>
          </CardPremium>
          
          <CardPremium className="p-4 text-center">
            <div className="text-2xl font-bold text-js-gold-600 mb-1">
              R$ {agendamentos.reduce((total, a) => total + (a.valor || 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-js-neutral-600">Total</div>
          </CardPremium>
        </div>
      </div>
    </ContainerLuxury>
  )
}

export default AgendamentosPage

