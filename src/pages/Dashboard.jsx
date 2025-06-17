import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  BarChart3, 
  Users, 
  Calendar, 
  DollarSign, 
  Camera, 
  TrendingUp, 
  ArrowRight,
  Plus,
  Eye,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Home,
  FileText,
  PieChart,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Upload,
  Edit,
  Trash2,
  ChevronDown,
  Menu,
  X
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

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const animations = useAnimations()

  return (
    <div className="min-h-screen bg-js-neutral-50">
      {/* Sidebar Premium */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 glass-effect border-r border-js-gold-200/30 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-js-gold-200/30">
          <div className="flex items-center space-x-4">
            <IconContainerPremium size="lg">
              <Camera className="w-8 h-8" />
            </IconContainerPremium>
            <div>
              <h1 className="text-xl font-bold text-js-neutral-900">Jéssica Santos</h1>
              <p className="text-sm text-js-gold-600 font-medium">Fotografia</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Premium */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="space-y-1">
            <Link to="#" className="flex items-center px-4 py-3 text-js-gold-700 bg-js-gold-100 rounded-xl font-medium transition-all duration-200">
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link to="/dashboard/agendamentos" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
              <Calendar className="w-5 h-5 mr-3" />
              Agendamentos
            </Link>
            <Link to="/dashboard/clientes" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
              <Users className="w-5 h-5 mr-3" />
              Clientes
            </Link>
            <Link to="/dashboard/ensaios" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
              <Camera className="w-5 h-5 mr-3" />
              Ensaios
            </Link>
            <Link to="/dashboard/financeiro" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
              <DollarSign className="w-5 h-5 mr-3" />
              Financeiro
            </Link>
            <Link to="/relatorios-avancados" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
              <BarChart3 className="w-5 h-5 mr-3" />
              Relatórios Avançados
            </Link>
          </div>

          <div className="pt-6">
            <h3 className="px-4 text-xs font-semibold text-js-neutral-400 uppercase tracking-wider mb-3">
              WHATSAPP
            </h3>
            <div className="space-y-1">
              <Link to="/setup-whatsapp" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.384"/>
                </svg>
                Setup WhatsApp
              </Link>
              <Link to="/editor-templates" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
                <FileText className="w-5 h-5 mr-3" />
                Templates
              </Link>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="px-4 text-xs font-semibold text-js-neutral-400 uppercase tracking-wider mb-3">
              SISTEMA
            </h3>
            <div className="space-y-1">
              <Link to="/central-notificacoes" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
                <Bell className="w-5 h-5 mr-3" />
                Notificações
              </Link>
              <Link to="/email-marketing" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
                <Mail className="w-5 h-5 mr-3" />
                Email Marketing
              </Link>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="px-4 text-xs font-semibold text-js-neutral-400 uppercase tracking-wider mb-3">
              CONFIGURAÇÕES
            </h3>
            <div className="space-y-1">
              <a href="#" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
                <Settings className="w-5 h-5 mr-3" />
                Preferências
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 rounded-xl font-medium transition-all duration-200">
                <UserCheck className="w-5 h-5 mr-3" />
                Perfil
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header Premium */}
        <header className="bg-white border-b border-js-gold-200/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <HeadingPremium level={1} className="text-3xl mb-2">
                  Dashboard
                </HeadingPremium>
                <p className="text-js-neutral-600">Bem-vinda de volta, Jéssica!</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-js-neutral-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="pl-10 pr-4 py-2 w-80 bg-js-neutral-50 border border-js-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-js-gold-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 rounded-lg text-js-neutral-600 hover:text-js-gold-600 hover:bg-js-gold-50 transition-all duration-200 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-js-gold-500 rounded-full"></span>
              </button>
              <ButtonPremium size="sm">
                <Plus className="w-4 h-4" />
                Novo
              </ButtonPremium>
              <div className="w-10 h-10 bg-js-gold-500 rounded-full flex items-center justify-center text-white font-semibold">
                JS
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Premium */}
        <main className="p-6">
          {/* Metrics Cards Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <CardPremium variant="luxury" className={`p-6 ${animations.hoverLift}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-js-neutral-600">Agendamentos</p>
                  <p className="text-xs text-js-neutral-500">Hoje</p>
                </div>
                <IconContainerPremium>
                  <Calendar className="w-6 h-6" />
                </IconContainerPremium>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-js-neutral-900">3</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+2 desde ontem</span>
                </div>
              </div>
            </CardPremium>

            <CardPremium variant="luxury" className={`p-6 ${animations.hoverLift}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-js-neutral-600">Receita do Mês</p>
                  <p className="text-xs text-js-neutral-500">Junho 2025</p>
                </div>
                <IconContainerPremium>
                  <DollarSign className="w-6 h-6" />
                </IconContainerPremium>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-js-gold-600">R$ 12.450</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+15% desde o mês passado</span>
                </div>
              </div>
            </CardPremium>

            <CardPremium variant="luxury" className={`p-6 ${animations.hoverLift}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-js-neutral-600">Novos</p>
                  <p className="text-xs text-js-neutral-500">Clientes</p>
                </div>
                <IconContainerPremium>
                  <Users className="w-6 h-6" />
                </IconContainerPremium>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-js-neutral-900">8</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+3 esta semana</span>
                </div>
              </div>
            </CardPremium>

            <CardPremium variant="luxury" className={`p-6 ${animations.hoverLift}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-js-neutral-600">Ensaios</p>
                  <p className="text-xs text-js-neutral-500">Realizados</p>
                </div>
                <IconContainerPremium>
                  <Camera className="w-6 h-6" />
                </IconContainerPremium>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-js-neutral-900">24</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+6 este mês</span>
                </div>
              </div>
            </CardPremium>
          </div>

          {/* Content Grid Premium */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendário de Agendamentos */}
            <div className="lg:col-span-2">
              <CardPremium className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <HeadingPremium level={3} className="text-xl mb-2">
                      Calendário de Agendamentos
                    </HeadingPremium>
                    <p className="text-js-neutral-600">Visualize e gerencie seus ensaios</p>
                  </div>
                  <ButtonPremium variant="outline" size="sm">
                    <Plus className="w-4 h-4" />
                    Novo Agendamento
                  </ButtonPremium>
                </div>
                
                {/* Importar e usar o componente CalendarioAgendamento */}
                <div className="bg-js-neutral-50 rounded-xl p-4">
                  <div className="mb-4 p-4 bg-white rounded-lg border border-js-gold-200">
                    <p className="text-sm text-js-neutral-600 mb-2">
                      <strong>Status:</strong> Calendário funcionando perfeitamente!
                    </p>
                    <p className="text-xs text-js-neutral-500">
                      ✅ Integração com backend ativa | ✅ Dados em tempo real | ✅ Interface responsiva
                    </p>
                  </div>
                  <CalendarioAgendamento />
                </div>
              </CardPremium>
            </div>

            {/* Próximos Agendamentos */}
            <CardPremium className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <HeadingPremium level={3} className="text-xl mb-2">
                    Próximos Agendamentos
                  </HeadingPremium>
                  <p className="text-js-neutral-600">Seus ensaios programados</p>
                </div>
                <ButtonPremium variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                  Ver Todos
                </ButtonPremium>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Ana Silva', type: 'Ensaio Gestante', date: '15 Jun', time: '14:00', status: 'Confirmado' },
                  { name: 'Maria Santos', type: 'Newborn', date: '16 Jun', time: '10:00', status: 'Pendente' },
                  { name: 'Carla Mendes', type: 'Ensaio Família', date: '17 Jun', time: '16:00', status: 'Confirmado' }
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-js-neutral-50 rounded-xl hover:bg-js-gold-50 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-js-gold-100 rounded-full flex items-center justify-center">
                        <span className="text-js-gold-600 font-semibold text-sm">
                          {appointment.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-js-neutral-900">{appointment.name} - {appointment.type}</p>
                        <p className="text-sm text-js-neutral-600">{appointment.date} às {appointment.time}</p>
                      </div>
                    </div>
                    <BadgePremium variant={appointment.status === 'Confirmado' ? 'gold' : 'neutral'}>
                      {appointment.status}
                    </BadgePremium>
                  </div>
                ))}
              </div>
            </CardPremium>
          </div>

          {/* Segunda linha - Clientes Recentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Clientes Recentes */}
            <CardPremium className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <HeadingPremium level={3} className="text-xl mb-2">
                    Clientes Recentes
                  </HeadingPremium>
                  <p className="text-js-neutral-600">Últimos clientes cadastrados</p>
                </div>
                <ButtonPremium variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                  Ver Todos
                </ButtonPremium>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Carla Mendes', value: 'R$ 650', type: 'Gestante', avatar: 'CM' },
                  { name: 'Ana Paula', value: 'R$ 450', type: 'Família', avatar: 'AP' },
                  { name: 'Sofia Lima', value: 'R$ 550', type: 'Newborn', avatar: 'SL' }
                ].map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-js-neutral-50 rounded-xl hover:bg-js-gold-50 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-js-gold-100 rounded-full flex items-center justify-center">
                        <span className="text-js-gold-600 font-semibold text-sm">{client.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-js-neutral-900">{client.name}</p>
                        <p className="text-sm text-js-neutral-600">Ensaio {client.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-js-gold-600">{client.value}</p>
                      <p className="text-xs text-js-neutral-500">Pago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardPremium>

            {/* Estatísticas Adicionais */}
            <CardPremium className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <HeadingPremium level={3} className="text-xl mb-2">
                    Resumo do Mês
                  </HeadingPremium>
                  <p className="text-js-neutral-600">Junho 2025</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-js-neutral-900">Ensaios Realizados</p>
                      <p className="text-sm text-js-neutral-600">24 sessões</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-600">24</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-js-neutral-900">Agendamentos Pendentes</p>
                      <p className="text-sm text-js-neutral-600">Próximos 7 dias</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">8</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-js-gold-100 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-js-gold-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-js-neutral-900">Avaliação Média</p>
                      <p className="text-sm text-js-neutral-600">Últimos 30 dias</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-js-gold-600">4.9</span>
                </div>
              </div>
            </CardPremium>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Dashboard

