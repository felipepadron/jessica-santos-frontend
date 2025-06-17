import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar, Clock, MapPin, User, Phone, Mail, MessageCircle, Check, ArrowLeft, ArrowRight } from 'lucide-react'

const Agendamento = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    servico: '',
    pacote: '',
    data: '',
    horario: '',
    nome: '',
    telefone: '',
    email: '',
    observacoes: ''
  })

  const servicos = {
    gestante: {
      nome: 'Ensaio Gestante',
      pacotes: [
        { id: 'essencial', nome: 'Essencial', preco: 450 },
        { id: 'completo', nome: 'Completo', preco: 650 },
        { id: 'premium', nome: 'Premium', preco: 850 }
      ]
    },
    newborn: {
      nome: 'Ensaio Newborn',
      pacotes: [
        { id: 'basico', nome: 'Básico', preco: 550 },
        { id: 'familia', nome: 'Família', preco: 750 },
        { id: 'lifestyle', nome: 'Lifestyle', preco: 950 }
      ]
    },
    familia: {
      nome: 'Ensaio Família',
      pacotes: [
        { id: 'simples', nome: 'Simples', preco: 380 },
        { id: 'tradicional', nome: 'Tradicional', preco: 580 },
        { id: 'estendida', nome: 'Estendida', preco: 780 }
      ]
    },
    mentoria: {
      nome: 'Mentoria Fotográfica',
      pacotes: [
        { id: 'basica', nome: 'Básica', preco: 200 },
        { id: 'avancada', nome: 'Avançada', preco: 350 },
        { id: 'intensiva', nome: 'Intensiva', preco: 500 }
      ]
    }
  }

  // Gerar horários disponíveis
  const gerarHorarios = () => {
    const horarios = []
    for (let h = 8; h <= 17; h++) {
      horarios.push(`${h.toString().padStart(2, '0')}:00`)
      if (h < 17) horarios.push(`${h.toString().padStart(2, '0')}:30`)
    }
    return horarios
  }

  // Gerar datas disponíveis (próximos 30 dias, exceto domingos)
  const gerarDatas = () => {
    const datas = []
    const hoje = new Date()
    
    for (let i = 1; i <= 30; i++) {
      const data = new Date(hoje)
      data.setDate(hoje.getDate() + i)
      
      // Pular domingos (0 = domingo)
      if (data.getDay() !== 0) {
        datas.push({
          valor: data.toISOString().split('T')[0],
          texto: data.toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: '2-digit', 
            month: 'long' 
          })
        })
      }
    }
    return datas
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Aqui seria enviado para o backend
    const servicoSelecionado = servicos[formData.servico]
    const pacoteSelecionado = servicoSelecionado?.pacotes.find(p => p.id === formData.pacote)
    
    const mensagem = `
🌸 *NOVO AGENDAMENTO* 🌸

👤 *Cliente:* ${formData.nome}
📞 *Telefone:* ${formData.telefone}
📧 *Email:* ${formData.email}

📸 *Serviço:* ${servicoSelecionado?.nome}
📦 *Pacote:* ${pacoteSelecionado?.nome} - R$ ${pacoteSelecionado?.preco}

📅 *Data:* ${new Date(formData.data).toLocaleDateString('pt-BR')}
🕐 *Horário:* ${formData.horario}

💬 *Observações:* ${formData.observacoes || 'Nenhuma'}

_Agendamento realizado pelo site_
    `.trim()

    // Simular envio para WhatsApp
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`
    window.open(whatsappUrl, '_blank')
    
    alert('Agendamento enviado! Você será redirecionado para o WhatsApp.')
  }

  const getSelectedPackagePrice = () => {
    if (!formData.servico || !formData.pacote) return 0
    const servico = servicos[formData.servico]
    const pacote = servico?.pacotes.find(p => p.id === formData.pacote)
    return pacote?.preco || 0
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Agendamento Online
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agende seu Ensaio
          </h1>
          <p className="text-xl text-gray-600">
            Preencha os dados abaixo e vamos conversar sobre seu momento especial
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= num ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > num ? <Check className="w-5 h-5" /> : num}
                </div>
                {num < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > num ? 'bg-rose-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8 text-sm text-gray-600">
            <span className={step >= 1 ? 'text-rose-600 font-medium' : ''}>Serviço</span>
            <span className={step >= 2 ? 'text-rose-600 font-medium' : ''}>Data & Hora</span>
            <span className={step >= 3 ? 'text-rose-600 font-medium' : ''}>Seus Dados</span>
          </div>
        </div>

        {/* Step 1: Escolha do Serviço */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-6 h-6" />
                <span>Escolha o Serviço e Pacote</span>
              </CardTitle>
              <CardDescription>
                Selecione o tipo de ensaio e o pacote que melhor atende suas necessidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Seleção de Serviço */}
              <div>
                <Label className="text-base font-medium mb-3 block">Tipo de Ensaio</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(servicos).map(([key, servico]) => (
                    <Card 
                      key={key}
                      className={`cursor-pointer transition-all ${
                        formData.servico === key ? 'ring-2 ring-rose-500 bg-rose-50' : 'hover:shadow-md'
                      }`}
                      onClick={() => handleInputChange('servico', key)}
                    >
                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold">{servico.nome}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {servico.pacotes.length} pacotes disponíveis
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Seleção de Pacote */}
              {formData.servico && (
                <div>
                  <Label className="text-base font-medium mb-3 block">Pacote</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {servicos[formData.servico].pacotes.map((pacote) => (
                      <Card 
                        key={pacote.id}
                        className={`cursor-pointer transition-all ${
                          formData.pacote === pacote.id ? 'ring-2 ring-rose-500 bg-rose-50' : 'hover:shadow-md'
                        }`}
                        onClick={() => handleInputChange('pacote', pacote.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <h4 className="font-semibold">{pacote.nome}</h4>
                          <p className="text-lg font-bold text-rose-600 mt-1">
                            R$ {pacote.preco}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {formData.servico && formData.pacote && (
                <Alert>
                  <Check className="w-4 h-4" />
                  <AlertDescription>
                    Selecionado: {servicos[formData.servico].nome} - {
                      servicos[formData.servico].pacotes.find(p => p.id === formData.pacote)?.nome
                    } por R$ {getSelectedPackagePrice()}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Data e Horário */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-6 h-6" />
                <span>Escolha Data e Horário</span>
              </CardTitle>
              <CardDescription>
                Selecione quando gostaria de realizar seu ensaio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Data */}
                <div>
                  <Label htmlFor="data" className="text-base font-medium">Data</Label>
                  <Select value={formData.data} onValueChange={(value) => handleInputChange('data', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione uma data" />
                    </SelectTrigger>
                    <SelectContent>
                      {gerarDatas().map((data) => (
                        <SelectItem key={data.valor} value={data.valor}>
                          {data.texto}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Horário */}
                <div>
                  <Label htmlFor="horario" className="text-base font-medium">Horário</Label>
                  <Select value={formData.horario} onValueChange={(value) => handleInputChange('horario', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {gerarHorarios().map((horario) => (
                        <SelectItem key={horario} value={horario}>
                          {horario}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.data && formData.horario && (
                <Alert>
                  <Calendar className="w-4 h-4" />
                  <AlertDescription>
                    Agendamento para {new Date(formData.data).toLocaleDateString('pt-BR')} às {formData.horario}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Dados Pessoais */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-6 h-6" />
                <span>Seus Dados</span>
              </CardTitle>
              <CardDescription>
                Preencha seus dados para finalizarmos o agendamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    placeholder="Seu nome completo"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="telefone">WhatsApp *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  placeholder="Conte-me mais sobre o que você tem em mente para o ensaio..."
                  className="mt-2"
                  rows={4}
                />
              </div>

              {/* Resumo */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg">Resumo do Agendamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Serviço:</span>
                    <span className="font-medium">
                      {servicos[formData.servico]?.nome} - {
                        servicos[formData.servico]?.pacotes.find(p => p.id === formData.pacote)?.nome
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data:</span>
                    <span className="font-medium">
                      {formData.data ? new Date(formData.data).toLocaleDateString('pt-BR') : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Horário:</span>
                    <span className="font-medium">{formData.horario || '-'}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-rose-600 pt-2 border-t">
                    <span>Valor:</span>
                    <span>R$ {getSelectedPackagePrice()}</span>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {step < 3 ? (
            <Button 
              onClick={nextStep}
              disabled={
                (step === 1 && (!formData.servico || !formData.pacote)) ||
                (step === 2 && (!formData.data || !formData.horario))
              }
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!formData.nome || !formData.telefone}
              className="bg-rose-600 hover:bg-rose-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Finalizar Agendamento
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Agendamento

