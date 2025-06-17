import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Clock,
  Send
} from 'lucide-react'

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const mensagem = `
🌸 *CONTATO PELO SITE* 🌸

👤 *Nome:* ${formData.nome}
📧 *Email:* ${formData.email}
📞 *Telefone:* ${formData.telefone}
📝 *Assunto:* ${formData.assunto}

💬 *Mensagem:*
${formData.mensagem}

_Enviado pelo formulário de contato_
    `.trim()

    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Contato
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Vamos Conversar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entre em contato comigo para agendar seu ensaio ou tirar suas dúvidas. 
            Estou aqui para ajudar você a eternizar seus momentos especiais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-rose-100 rounded-full">
                    <MessageCircle className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-gray-600">(11) 99999-9999</p>
                    <p className="text-sm text-gray-500">Resposta rápida garantida</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-rose-100 rounded-full">
                    <Mail className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">E-mail</h3>
                    <p className="text-gray-600">contato@jessicasantos.com</p>
                    <p className="text-sm text-gray-500">Para orçamentos detalhados</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-rose-100 rounded-full">
                    <Instagram className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instagram</h3>
                    <p className="text-gray-600">@jessicasantosfoto</p>
                    <p className="text-sm text-gray-500">Veja mais do meu trabalho</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-rose-100 rounded-full">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Localização</h3>
                    <p className="text-gray-600">São Paulo - SP</p>
                    <p className="text-sm text-gray-500">Atendo toda a região metropolitana</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-rose-100 rounded-full">
                    <Clock className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Horário de Atendimento</h3>
                    <p className="text-gray-600">Segunda a Sábado</p>
                    <p className="text-sm text-gray-500">8h às 18h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Rápidos */}
            <Card>
              <CardHeader>
                <CardTitle>Acesso Rápido</CardTitle>
                <CardDescription>
                  Escolha a melhor forma de entrar em contato
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Conversar no WhatsApp
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Instagram className="w-4 h-4 mr-2" />
                  Seguir no Instagram
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar E-mail
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Contato */}
          <Card>
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e entrarei em contato em breve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Seu nome completo"
                      required
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
                      required
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
                  <Label htmlFor="assunto">Assunto</Label>
                  <Input
                    id="assunto"
                    value={formData.assunto}
                    onChange={(e) => handleInputChange('assunto', e.target.value)}
                    placeholder="Ex: Orçamento para ensaio gestante"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="mensagem">Mensagem *</Label>
                  <Textarea
                    id="mensagem"
                    value={formData.mensagem}
                    onChange={(e) => handleInputChange('mensagem', e.target.value)}
                    placeholder="Conte-me mais sobre o que você tem em mente..."
                    required
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Rápido */}
        <div className="mt-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Respostas rápidas para as dúvidas mais comuns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Qual o prazo de entrega das fotos?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    As fotos editadas ficam prontas em até 15 dias úteis após o ensaio.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Posso escolher as fotos que serão editadas?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Sim! Você receberá uma galeria para escolher suas favoritas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Fazem ensaios em domicílio?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Sim, atendo em domicílio com taxa de deslocamento.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Qual a forma de pagamento?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Aceito PIX, cartão e parcelamento em até 12x.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Contato

