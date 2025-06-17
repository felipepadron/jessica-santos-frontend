import React from 'react'
import { Calendar, Users, Camera, DollarSign, Plus, Search } from 'lucide-react'
import CalendarioAgendamento from '../components/CalendarioAgendamento'

const DashboardAgendamentos = () => {
  return (
    <div className="min-h-screen bg-js-neutral-50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-js-neutral-900 mb-2">
              Agendamentos
            </h1>
            <p className="text-js-neutral-600">Gerencie seus ensaios e compromissos</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-js-neutral-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar agendamentos..." 
                className="pl-10 pr-4 py-2 w-80 bg-white border border-js-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-js-gold-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-js-gold-500 text-white rounded-lg hover:bg-js-gold-600 transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </button>
          </div>
        </div>

        {/* Calendário de Agendamentos */}
        <div className="bg-white rounded-xl shadow-sm border border-js-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-js-neutral-900 mb-6">
            Calendário de Agendamentos
          </h2>
          <CalendarioAgendamento />
        </div>

        {/* Lista de Agendamentos */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-js-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-js-neutral-900 mb-6">
            Próximos Agendamentos
          </h2>
          
          <div className="space-y-4">
            {[
              {
                id: 1,
                cliente: 'Maria Silva',
                tipo: 'Ensaio Gestante',
                data: '2025-06-20',
                hora: '10:00',
                status: 'Confirmado',
                valor: 'R$ 450'
              },
              {
                id: 2,
                cliente: 'João Santos',
                tipo: 'Ensaio Casal',
                data: '2025-06-22',
                hora: '14:00',
                status: 'Pendente',
                valor: 'R$ 650'
              },
              {
                id: 3,
                cliente: 'Ana Costa',
                tipo: 'Ensaio Família',
                data: '2025-06-25',
                hora: '16:00',
                status: 'Confirmado',
                valor: 'R$ 550'
              }
            ].map((agendamento) => (
              <div key={agendamento.id} className="flex items-center justify-between p-4 bg-js-neutral-50 rounded-xl hover:bg-js-gold-50 transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-js-gold-100 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-js-gold-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-js-neutral-900">{agendamento.cliente}</p>
                    <p className="text-sm text-js-neutral-600">{agendamento.tipo}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-js-neutral-900">{agendamento.data}</p>
                    <p className="text-xs text-js-neutral-600">{agendamento.hora}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-semibold text-js-gold-600">{agendamento.valor}</p>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    agendamento.status === 'Confirmado' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agendamento.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAgendamentos

