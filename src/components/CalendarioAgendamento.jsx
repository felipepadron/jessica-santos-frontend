import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, DollarSign } from 'lucide-react';
import { agendamentoService } from '../services';

const CalendarioAgendamento = ({ onAgendamentoSelect, clienteId = null }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipoEnsaio, setTipoEnsaio] = useState('retrato');
  const [horario, setHorario] = useState('09:00');
  const [observacoes, setObservacoes] = useState('');

  // Tipos de ensaio disponíveis
  const tiposEnsaio = [
    { value: 'retrato', label: 'Retrato Individual', duracao: 2, valor: 450 },
    { value: 'casal', label: 'Ensaio de Casal', duracao: 3, valor: 650 },
    { value: 'familia', label: 'Ensaio Familiar', duracao: 3, valor: 750 },
    { value: 'gestante', label: 'Gestante', duracao: 2.5, valor: 550 },
    { value: 'newborn', label: 'Newborn', duracao: 4, valor: 850 },
    { value: 'corporativo', label: 'Corporativo', duracao: 1.5, valor: 350 }
  ];

  // Horários disponíveis
  const horariosDisponiveis = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  useEffect(() => {
    carregarAgendamentos();
  }, [currentDate]);

  const carregarAgendamentos = async () => {
    try {
      setLoading(true);
      // Simular dados para demonstração
      const dadosSimulados = [
        {
          id: 1,
          data: '2025-06-20',
          horario: '14:00',
          cliente: 'Ana Silva',
          tipo: 'gestante',
          status: 'confirmado'
        },
        {
          id: 2,
          data: '2025-06-22',
          horario: '10:00',
          cliente: 'Maria Santos',
          tipo: 'newborn',
          status: 'agendado'
        },
        {
          id: 3,
          data: '2025-06-25',
          horario: '16:00',
          cliente: 'Carla Mendes',
          tipo: 'familia',
          status: 'realizado'
        }
      ];
      
      setAgendamentos(dadosSimulados);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      setAgendamentos([]);
    } finally {
      setLoading(false);
    }
  };

  // Funções do calendário
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Ajustar para segunda-feira = 0
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const hasAgendamento = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return agendamentos.find(ag => ag.data === dateStr);
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const selectDate = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getStatusColor = (status) => {
    const colors = {
      'agendado': 'bg-blue-100 text-blue-800',
      'confirmado': 'bg-green-100 text-green-800',
      'realizado': 'bg-gray-100 text-gray-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const criarAgendamento = async () => {
    if (!selectedDate) {
      alert('Por favor, selecione uma data');
      return;
    }

    const tipoSelecionado = tiposEnsaio.find(t => t.value === tipoEnsaio);
    
    const dadosAgendamento = {
      clienteId: clienteId,
      data: selectedDate.toISOString().split('T')[0],
      horario: horario,
      tipoEnsaio: tipoEnsaio,
      local: 'Estúdio Principal',
      valor: tipoSelecionado.valor,
      duracao: tipoSelecionado.duracao,
      status: 'agendado',
      observacoes: observacoes
    };

    try {
      alert('Agendamento criado com sucesso!');
      
      // Callback para componente pai
      if (onAgendamentoSelect) {
        onAgendamentoSelect(dadosAgendamento);
      }
      
      // Recarregar calendário
      await carregarAgendamentos();
      
      // Limpar seleção
      setSelectedDate(null);
      setObservacoes('');
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      alert('Erro ao criar agendamento. Tente novamente.');
    }
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Dias vazios do início do mês
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const agendamento = hasAgendamento(day);
      const isSelectedDay = isSelected(day);
      const isTodayDay = isToday(day);

      days.push(
        <div
          key={day}
          onClick={() => selectDate(day)}
          className={`
            h-12 flex items-center justify-center cursor-pointer rounded-lg text-sm font-medium transition-all duration-200
            ${isSelectedDay 
              ? 'bg-js-gold-500 text-white shadow-lg' 
              : isTodayDay 
                ? 'bg-js-gold-100 text-js-gold-700 border-2 border-js-gold-300'
                : 'hover:bg-js-gold-50 text-js-neutral-700'
            }
            ${agendamento ? 'ring-2 ring-blue-300' : ''}
          `}
        >
          <div className="text-center">
            <div>{day}</div>
            {agendamento && (
              <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                agendamento.status === 'confirmado' ? 'bg-green-500' :
                agendamento.status === 'agendado' ? 'bg-blue-500' :
                agendamento.status === 'realizado' ? 'bg-gray-500' : 'bg-red-500'
              }`}></div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const tipoSelecionado = tiposEnsaio.find(t => t.value === tipoEnsaio);
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-js-gold-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-js-neutral-600">Carregando calendário...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendário */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-js-neutral-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-js-gold-600" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-lg hover:bg-js-gold-50 text-js-neutral-600 hover:text-js-gold-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-lg hover:bg-js-gold-50 text-js-neutral-600 hover:text-js-gold-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cabeçalho dos dias da semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-js-neutral-500 uppercase">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid do calendário */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarGrid()}
            </div>
          </div>

          {/* Legenda */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-js-neutral-600">Agendado</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-js-neutral-600">Confirmado</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
              <span className="text-js-neutral-600">Realizado</span>
            </div>
          </div>
        </div>

        {/* Formulário de agendamento */}
        <div className="bg-js-neutral-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-js-neutral-800 mb-4">Novo Agendamento</h4>
          
          {selectedDate && (
            <div className="mb-4 p-3 bg-js-gold-50 rounded-lg border border-js-gold-200">
              <p className="text-sm font-medium text-js-gold-800">
                Data selecionada: {selectedDate.toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-js-neutral-700 mb-2">
                Tipo de Ensaio:
              </label>
              <select 
                value={tipoEnsaio} 
                onChange={(e) => setTipoEnsaio(e.target.value)}
                className="w-full px-3 py-2 border border-js-neutral-300 rounded-lg focus:ring-2 focus:ring-js-gold-500 focus:border-transparent"
              >
                {tiposEnsaio.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label} - R$ {tipo.valor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-js-neutral-700 mb-2">
                Horário:
              </label>
              <select 
                value={horario} 
                onChange={(e) => setHorario(e.target.value)}
                className="w-full px-3 py-2 border border-js-neutral-300 rounded-lg focus:ring-2 focus:ring-js-gold-500 focus:border-transparent"
              >
                {horariosDisponiveis.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-js-neutral-700 mb-2">
                Observações:
              </label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Observações especiais para o ensaio..."
                className="w-full px-3 py-2 border border-js-neutral-300 rounded-lg focus:ring-2 focus:ring-js-gold-500 focus:border-transparent"
                rows="3"
              />
            </div>

            {selectedDate && tipoSelecionado && (
              <div className="bg-white rounded-lg p-4 border border-js-neutral-200">
                <h5 className="font-medium text-js-neutral-800 mb-2">Resumo:</h5>
                <div className="space-y-1 text-sm text-js-neutral-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedDate.toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {horario} ({tipoSelecionado.duracao}h)
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Estúdio Principal
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    R$ {tipoSelecionado.valor}
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={criarAgendamento}
              disabled={!selectedDate}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                selectedDate
                  ? 'bg-js-gold-500 hover:bg-js-gold-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-js-neutral-300 text-js-neutral-500 cursor-not-allowed'
              }`}
            >
              {selectedDate ? 'Confirmar Agendamento' : 'Selecione uma Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioAgendamento;

