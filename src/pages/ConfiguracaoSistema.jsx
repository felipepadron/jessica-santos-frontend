import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Settings, 
  User, 
  DollarSign, 
  MessageCircle, 
  Mail, 
  Instagram,
  Clock,
  MapPin,
  Palette,
  Shield,
  Save,
  Check,
  AlertTriangle,
  Upload,
  Download
} from 'lucide-react'

const ConfiguracaoSistema = () => {
  const [config, setConfig] = useState({
    // Dados pessoais e profissionais
    pessoal: {
      nome: 'Jéssica Santos',
      telefone: '(11) 99999-9999',
      email: 'contato@jessicasantos.com',
      instagram: '@jessicasantosfoto',
      endereco: 'São Paulo - SP',
      biografia: 'Fotógrafa especializada em maternidade e família, apaixonada por eternizar momentos únicos.',
      experiencia: '5+ anos',
      especialidades: ['Gestante', 'Newborn', 'Família', 'Mentoria']
    },
    
    // Configurações de negócio
    negocio: {
      horarioInicio: '08:00',
      horarioFim: '18:00',
      diasFuncionamento: ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'],
      tempoEnsaio: {
        gestante: 90,
        newborn: 180,
        familia: 120,
        mentoria: 240
      },
      intervaloAgendamentos: 30,
      antecedenciaMinima: 24,
      locaisAtendimento: ['Estúdio', 'Domicílio', 'Externa']
    },
    
    // Preços dos pacotes
    precos: {
      gestante: {
        essencial: { valor: 450, fotos: 20, tempo: 90 },
        completo: { valor: 650, fotos: 35, tempo: 120 },
        premium: { valor: 850, fotos: 50, tempo: 180 }
      },
      newborn: {
        basico: { valor: 550, fotos: 25, tempo: 120 },
        familia: { valor: 750, fotos: 40, tempo: 180 },
        lifestyle: { valor: 950, fotos: 60, tempo: 240 }
      },
      familia: {
        simples: { valor: 380, fotos: 20, tempo: 60 },
        tradicional: { valor: 580, fotos: 35, tempo: 90 },
        estendida: { valor: 780, fotos: 50, tempo: 120 }
      },
      mentoria: {
        basica: { valor: 200, horas: 2 },
        avancada: { valor: 350, horas: 4 },
        intensiva: { valor: 500, horas: 6 }
      }
    },
    
    // Configurações de pagamento
    pagamento: {
      descontoAvista: 10,
      parcelasMaximas: 12,
      jurosParcelas: 2.5,
      pixAtivo: true,
      cartaoAtivo: true,
      dinheiroAtivo: true,
      contaBanco: {
        banco: 'Banco do Brasil',
        agencia: '1234-5',
        conta: '12345-6',
        pix: 'contato@jessicasantos.com'
      }
    },
    
    // Integrações
    integracoes: {
      whatsapp: {
        ativo: false,
        numero: '5511999999999',
        token: '',
        mensagemPadrao: 'Olá! Obrigada pelo interesse nos meus serviços. Como posso ajudar você?'
      },
      email: {
        ativo: false,
        servidor: 'smtp.gmail.com',
        porta: 587,
        usuario: '',
        senha: '',
        remetente: 'Jéssica Santos Fotografia'
      },
      analytics: {
        googleAnalytics: {
          ativo: false,
          trackingId: ''
        },
        facebookPixel: {
          ativo: false,
          pixelId: ''
        }
      },
      social: {
        instagram: 'https://instagram.com/jessicasantosfoto',
        facebook: '',
        youtube: ''
      }
    },
    
    // Configurações visuais
    visual: {
      tema: 'rose',
      logoUrl: '',
      corPrimaria: '#e11d48',
      corSecundaria: '#f43f5e',
      fontePrimaria: 'Inter',
      fonteSecundaria: 'Playfair Display'
    },
    
    // Textos personalizados
    textos: {
      heroTitle: 'Jéssica Santos Fotografia',
      heroSubtitle: 'Eternizando momentos únicos da maternidade e família com sensibilidade, técnica e muito amor.',
      sobreResumo: 'Há mais de 5 anos me dedico à arte de capturar momentos únicos e especiais.',
      chamadaContato: 'Vamos conversar sobre seu momento especial?',
      rodape: '© 2024 Jéssica Santos Fotografia. Todos os direitos reservados.'
    },
    
    // Configurações de segurança
    seguranca: {
      senhaAdmin: '',
      sessaoExpira: 24,
      backupAutomatico: true,
      logAcessos: true,
      notificacaoLogin: true
    }
  })

  const [activeTab, setActiveTab] = useState('pessoal')
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState({})

  // Carregar configurações salvas
  useEffect(() => {
    const savedConfig = localStorage.getItem('jessica_santos_config')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  // Salvar configurações
  const handleSave = () => {
    try {
      localStorage.setItem('jessica_santos_config', JSON.stringify(config))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
    }
  }

  // Atualizar configuração
  const updateConfig = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Validar integrações
  const validateIntegration = (type) => {
    const integration = config.integracoes[type]
    // Aqui seria feita a validação real da integração
    return Math.random() > 0.5 // Simulação
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Settings className="w-4 h-4 mr-2" />
            Configurações do Sistema
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Painel de Configurações
          </h1>
          <p className="text-xl text-gray-600">
            Configure todos os aspectos do seu sistema de fotografia
          </p>
        </div>

        {/* Alertas */}
        {saved && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Check className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Configurações salvas com sucesso!
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs de Configuração */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="pessoal" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Pessoal</span>
            </TabsTrigger>
            <TabsTrigger value="negocio" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Negócio</span>
            </TabsTrigger>
            <TabsTrigger value="precos" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Preços</span>
            </TabsTrigger>
            <TabsTrigger value="pagamento" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Pagamento</span>
            </TabsTrigger>
            <TabsTrigger value="integracoes" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Integrações</span>
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Visual</span>
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Dados Pessoais */}
          <TabsContent value="pessoal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Dados Pessoais e Profissionais</span>
                </CardTitle>
                <CardDescription>
                  Configure suas informações pessoais e profissionais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={config.pessoal.nome}
                      onChange={(e) => updateConfig('pessoal', 'nome', e.target.value)}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">WhatsApp</Label>
                    <Input
                      id="telefone"
                      value={config.pessoal.telefone}
                      onChange={(e) => updateConfig('pessoal', 'telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={config.pessoal.email}
                      onChange={(e) => updateConfig('pessoal', 'email', e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={config.pessoal.instagram}
                      onChange={(e) => updateConfig('pessoal', 'instagram', e.target.value)}
                      placeholder="@seuinstagram"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="endereco">Localização</Label>
                  <Input
                    id="endereco"
                    value={config.pessoal.endereco}
                    onChange={(e) => updateConfig('pessoal', 'endereco', e.target.value)}
                    placeholder="Cidade - Estado"
                  />
                </div>

                <div>
                  <Label htmlFor="biografia">Biografia Profissional</Label>
                  <Textarea
                    id="biografia"
                    value={config.pessoal.biografia}
                    onChange={(e) => updateConfig('pessoal', 'biografia', e.target.value)}
                    placeholder="Conte um pouco sobre sua trajetória profissional..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Configurações de Negócio */}
          <TabsContent value="negocio">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Configurações de Negócio</span>
                </CardTitle>
                <CardDescription>
                  Configure horários, dias de funcionamento e regras de agendamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="horarioInicio">Horário de Início</Label>
                    <Input
                      id="horarioInicio"
                      type="time"
                      value={config.negocio.horarioInicio}
                      onChange={(e) => updateConfig('negocio', 'horarioInicio', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="horarioFim">Horário de Fim</Label>
                    <Input
                      id="horarioFim"
                      type="time"
                      value={config.negocio.horarioFim}
                      onChange={(e) => updateConfig('negocio', 'horarioFim', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Dias de Funcionamento</Label>
                  <div className="grid grid-cols-3 md:grid-cols-7 gap-2 mt-2">
                    {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((dia, index) => (
                      <div key={dia} className="flex items-center space-x-2">
                        <Switch
                          checked={config.negocio.diasFuncionamento.includes(dia.toLowerCase())}
                          onCheckedChange={(checked) => {
                            const dias = checked 
                              ? [...config.negocio.diasFuncionamento, dia.toLowerCase()]
                              : config.negocio.diasFuncionamento.filter(d => d !== dia.toLowerCase())
                            updateConfig('negocio', 'diasFuncionamento', dias)
                          }}
                        />
                        <Label className="text-sm">{dia.slice(0, 3)}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Duração dos Ensaios (minutos)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    {Object.entries(config.negocio.tempoEnsaio).map(([tipo, tempo]) => (
                      <div key={tipo}>
                        <Label className="text-sm capitalize">{tipo}</Label>
                        <Input
                          type="number"
                          value={tempo}
                          onChange={(e) => updateConfig('negocio', 'tempoEnsaio', {
                            ...config.negocio.tempoEnsaio,
                            [tipo]: parseInt(e.target.value)
                          })}
                          min="30"
                          max="480"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Preços */}
          <TabsContent value="precos">
            <div className="space-y-6">
              {Object.entries(config.precos).map(([categoria, pacotes]) => (
                <Card key={categoria}>
                  <CardHeader>
                    <CardTitle className="capitalize">{categoria}</CardTitle>
                    <CardDescription>
                      Configure os preços e detalhes dos pacotes de {categoria}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Object.entries(pacotes).map(([pacote, detalhes]) => (
                        <div key={pacote} className="space-y-4 p-4 border rounded-lg">
                          <h4 className="font-semibold capitalize">{pacote}</h4>
                          <div>
                            <Label>Valor (R$)</Label>
                            <Input
                              type="number"
                              value={detalhes.valor}
                              onChange={(e) => updateConfig('precos', categoria, {
                                ...config.precos[categoria],
                                [pacote]: {
                                  ...detalhes,
                                  valor: parseInt(e.target.value)
                                }
                              })}
                            />
                          </div>
                          {detalhes.fotos && (
                            <div>
                              <Label>Fotos Editadas</Label>
                              <Input
                                type="number"
                                value={detalhes.fotos}
                                onChange={(e) => updateConfig('precos', categoria, {
                                  ...config.precos[categoria],
                                  [pacote]: {
                                    ...detalhes,
                                    fotos: parseInt(e.target.value)
                                  }
                                })}
                              />
                            </div>
                          )}
                          {detalhes.tempo && (
                            <div>
                              <Label>Tempo (min)</Label>
                              <Input
                                type="number"
                                value={detalhes.tempo}
                                onChange={(e) => updateConfig('precos', categoria, {
                                  ...config.precos[categoria],
                                  [pacote]: {
                                    ...detalhes,
                                    tempo: parseInt(e.target.value)
                                  }
                                })}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Integrações */}
          <TabsContent value="integracoes">
            <div className="space-y-6">
              {/* WhatsApp */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp Business</span>
                    </div>
                    <Switch
                      checked={config.integracoes.whatsapp.ativo}
                      onCheckedChange={(checked) => updateConfig('integracoes', 'whatsapp', {
                        ...config.integracoes.whatsapp,
                        ativo: checked
                      })}
                    />
                  </CardTitle>
                  <CardDescription>
                    Configure a integração com WhatsApp para agendamentos automáticos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Número do WhatsApp</Label>
                    <Input
                      value={config.integracoes.whatsapp.numero}
                      onChange={(e) => updateConfig('integracoes', 'whatsapp', {
                        ...config.integracoes.whatsapp,
                        numero: e.target.value
                      })}
                      placeholder="5511999999999"
                    />
                  </div>
                  <div>
                    <Label>Mensagem Padrão</Label>
                    <Textarea
                      value={config.integracoes.whatsapp.mensagemPadrao}
                      onChange={(e) => updateConfig('integracoes', 'whatsapp', {
                        ...config.integracoes.whatsapp,
                        mensagemPadrao: e.target.value
                      })}
                      rows={3}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => validateIntegration('whatsapp')}
                  >
                    Testar Integração
                  </Button>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span>E-mail</span>
                    </div>
                    <Switch
                      checked={config.integracoes.email.ativo}
                      onCheckedChange={(checked) => updateConfig('integracoes', 'email', {
                        ...config.integracoes.email,
                        ativo: checked
                      })}
                    />
                  </CardTitle>
                  <CardDescription>
                    Configure o envio automático de e-mails
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Servidor SMTP</Label>
                      <Input
                        value={config.integracoes.email.servidor}
                        onChange={(e) => updateConfig('integracoes', 'email', {
                          ...config.integracoes.email,
                          servidor: e.target.value
                        })}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <Label>Porta</Label>
                      <Input
                        type="number"
                        value={config.integracoes.email.porta}
                        onChange={(e) => updateConfig('integracoes', 'email', {
                          ...config.integracoes.email,
                          porta: parseInt(e.target.value)
                        })}
                        placeholder="587"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Usuário</Label>
                    <Input
                      value={config.integracoes.email.usuario}
                      onChange={(e) => updateConfig('integracoes', 'email', {
                        ...config.integracoes.email,
                        usuario: e.target.value
                      })}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <Label>Senha do App</Label>
                    <Input
                      type="password"
                      value={config.integracoes.email.senha}
                      onChange={(e) => updateConfig('integracoes', 'email', {
                        ...config.integracoes.email,
                        senha: e.target.value
                      })}
                      placeholder="Senha específica do app"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Analytics e Tracking</CardTitle>
                  <CardDescription>
                    Configure Google Analytics e Facebook Pixel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Google Analytics</Label>
                      <Input
                        value={config.integracoes.analytics.googleAnalytics.trackingId}
                        onChange={(e) => updateConfig('integracoes', 'analytics', {
                          ...config.integracoes.analytics,
                          googleAnalytics: {
                            ...config.integracoes.analytics.googleAnalytics,
                            trackingId: e.target.value
                          }
                        })}
                        placeholder="G-XXXXXXXXXX"
                        className="mt-2"
                      />
                    </div>
                    <Switch
                      checked={config.integracoes.analytics.googleAnalytics.ativo}
                      onCheckedChange={(checked) => updateConfig('integracoes', 'analytics', {
                        ...config.integracoes.analytics,
                        googleAnalytics: {
                          ...config.integracoes.analytics.googleAnalytics,
                          ativo: checked
                        }
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Facebook Pixel</Label>
                      <Input
                        value={config.integracoes.analytics.facebookPixel.pixelId}
                        onChange={(e) => updateConfig('integracoes', 'analytics', {
                          ...config.integracoes.analytics,
                          facebookPixel: {
                            ...config.integracoes.analytics.facebookPixel,
                            pixelId: e.target.value
                          }
                        })}
                        placeholder="XXXXXXXXXXXXXXXXX"
                        className="mt-2"
                      />
                    </div>
                    <Switch
                      checked={config.integracoes.analytics.facebookPixel.ativo}
                      onCheckedChange={(checked) => updateConfig('integracoes', 'analytics', {
                        ...config.integracoes.analytics,
                        facebookPixel: {
                          ...config.integracoes.analytics.facebookPixel,
                          ativo: checked
                        }
                      })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Outras tabs... */}
        </Tabs>

        {/* Botões de Ação */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t">
          <div className="flex space-x-4">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Importar Configurações
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Configurações
            </Button>
          </div>
          
          <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700">
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfiguracaoSistema

