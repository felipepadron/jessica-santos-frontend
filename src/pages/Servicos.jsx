import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, 
  Baby, 
  Users, 
  Camera, 
  Clock, 
  MapPin, 
  Star,
  Check,
  ArrowRight,
  MessageCircle,
  Calendar
} from 'lucide-react'

const Servicos = () => {
  const [selectedPackage, setSelectedPackage] = useState(null)

  const servicos = {
    gestante: {
      nome: 'Ensaio Gestante',
      icone: <Heart className="w-8 h-8" />,
      descricao: 'Eternize a beleza da maternidade com fotos únicas e emocionantes',
      duracao: '1h30min',
      local: 'Estúdio ou Externa',
      pacotes: [
        {
          nome: 'Essencial',
          preco: 450,
          descricao: 'Perfeito para quem quer registrar esse momento especial',
          inclui: [
            '1h30 de ensaio',
            '20 fotos editadas',
            'Galeria online privada',
            '3 poses diferentes',
            'Orientação de poses'
          ],
          destaque: false
        },
        {
          nome: 'Completo',
          preco: 650,
          descricao: 'O mais escolhido pelas mamães',
          inclui: [
            '2h de ensaio',
            '35 fotos editadas',
            'Galeria online privada',
            '5 poses diferentes',
            'Orientação de poses',
            'Acessórios inclusos',
            '2 looks diferentes'
          ],
          destaque: true
        },
        {
          nome: 'Premium',
          preco: 850,
          descricao: 'Experiência completa e luxuosa',
          inclui: [
            '3h de ensaio',
            '50 fotos editadas',
            'Galeria online privada',
            'Poses ilimitadas',
            'Orientação completa',
            'Acessórios premium',
            '3 looks diferentes',
            'Maquiagem básica',
            'Álbum digital'
          ],
          destaque: false
        }
      ]
    },
    newborn: {
      nome: 'Ensaio Newborn',
      icone: <Baby className="w-8 h-8" />,
      descricao: 'Primeiros dias de vida capturados com todo carinho e delicadeza',
      duracao: '2h a 3h',
      local: 'Estúdio aquecido',
      pacotes: [
        {
          nome: 'Básico',
          preco: 550,
          descricao: 'Ideal para registrar os primeiros dias',
          inclui: [
            '2h de ensaio',
            '25 fotos editadas',
            'Galeria online privada',
            'Props básicos',
            'Ambiente aquecido',
            'Paciência total com o bebê'
          ],
          destaque: false
        },
        {
          nome: 'Família',
          preco: 750,
          descricao: 'Inclui fotos com os pais e irmãos',
          inclui: [
            '3h de ensaio',
            '40 fotos editadas',
            'Galeria online privada',
            'Props premium',
            'Fotos com família',
            'Ambiente aquecido',
            'Paciência total',
            'Orientação para pais'
          ],
          destaque: true
        },
        {
          nome: 'Lifestyle',
          preco: 950,
          descricao: 'Ensaio natural na sua casa',
          inclui: [
            '4h de ensaio',
            '60 fotos editadas',
            'Galeria online privada',
            'Na sua casa',
            'Fotos naturais',
            'Detalhes do bebê',
            'Família completa',
            'Props portáteis',
            'Álbum digital'
          ],
          destaque: false
        }
      ]
    },
    familia: {
      nome: 'Ensaio Família',
      icone: <Users className="w-8 h-8" />,
      descricao: 'Momentos especiais em família registrados para sempre',
      duracao: '1h a 2h',
      local: 'Externa ou Estúdio',
      pacotes: [
        {
          nome: 'Simples',
          preco: 380,
          descricao: 'Perfeito para famílias pequenas',
          inclui: [
            '1h de ensaio',
            '20 fotos editadas',
            'Galeria online privada',
            'Até 4 pessoas',
            'Local externo',
            'Orientação de poses'
          ],
          destaque: false
        },
        {
          nome: 'Tradicional',
          preco: 580,
          descricao: 'O favorito das famílias',
          inclui: [
            '1h30 de ensaio',
            '35 fotos editadas',
            'Galeria online privada',
            'Até 6 pessoas',
            '2 locais diferentes',
            'Orientação completa',
            'Props básicos'
          ],
          destaque: true
        },
        {
          nome: 'Estendida',
          preco: 780,
          descricao: 'Para famílias grandes',
          inclui: [
            '2h de ensaio',
            '50 fotos editadas',
            'Galeria online privada',
            'Pessoas ilimitadas',
            '3 locais diferentes',
            'Orientação completa',
            'Props premium',
            'Fotos individuais'
          ],
          destaque: false
        }
      ]
    },
    mentoria: {
      nome: 'Mentoria Fotográfica',
      icone: <Camera className="w-8 h-8" />,
      descricao: 'Aprenda técnicas profissionais de fotografia',
      duracao: '2h a 4h',
      local: 'Presencial ou Online',
      pacotes: [
        {
          nome: 'Básica',
          preco: 200,
          descricao: 'Fundamentos da fotografia',
          inclui: [
            '2h de mentoria',
            'Técnicas básicas',
            'Configurações de câmera',
            'Composição',
            'Material de apoio',
            'Suporte por 7 dias'
          ],
          destaque: false
        },
        {
          nome: 'Avançada',
          preco: 350,
          descricao: 'Para quem quer se profissionalizar',
          inclui: [
            '4h de mentoria',
            'Técnicas avançadas',
            'Edição básica',
            'Posicionamento',
            'Precificação',
            'Material completo',
            'Suporte por 30 dias',
            'Prática supervisionada'
          ],
          destaque: true
        },
        {
          nome: 'Intensiva',
          preco: 500,
          descricao: 'Imersão completa',
          inclui: [
            '6h de mentoria',
            'Todas as técnicas',
            'Edição avançada',
            'Negócio fotográfico',
            'Marketing pessoal',
            'Material premium',
            'Suporte por 60 dias',
            'Acompanhamento',
            'Certificado'
          ],
          destaque: false
        }
      ]
    }
  }

  const calcularParcelamento = (valor) => {
    const parcelas = [
      { vezes: 1, valor: valor, desconto: 0.1 },
      { vezes: 2, valor: valor / 2, desconto: 0.05 },
      { vezes: 3, valor: valor / 3, desconto: 0 },
      { vezes: 6, valor: (valor * 1.1) / 6, desconto: 0 },
      { vezes: 12, valor: (valor * 1.2) / 12, desconto: 0 }
    ]
    return parcelas
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Nossos Serviços
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Especializações em Fotografia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada momento da sua vida merece ser eternizado com carinho e profissionalismo. 
            Escolha o serviço ideal para você.
          </p>
        </div>

        {/* Tabs de Serviços */}
        <Tabs defaultValue="gestante" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
            {Object.entries(servicos).map(([key, servico]) => (
              <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                {servico.icone}
                <span className="hidden sm:inline">{servico.nome}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(servicos).map(([key, servico]) => (
            <TabsContent key={key} value={key}>
              <div className="space-y-12">
                {/* Info do Serviço */}
                <Card className="bg-gradient-to-r from-rose-50 to-pink-50">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-rose-100 rounded-full w-fit">
                      {servico.icone}
                    </div>
                    <CardTitle className="text-3xl">{servico.nome}</CardTitle>
                    <CardDescription className="text-lg">
                      {servico.descricao}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Clock className="w-5 h-5 text-rose-600" />
                        <span>Duração: {servico.duracao}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <MapPin className="w-5 h-5 text-rose-600" />
                        <span>Local: {servico.local}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pacotes */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {servico.pacotes.map((pacote, index) => (
                    <Card 
                      key={index} 
                      className={`relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                        pacote.destaque ? 'ring-2 ring-rose-500 scale-105' : ''
                      }`}
                    >
                      {pacote.destaque && (
                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-600">
                          Mais Escolhido
                        </Badge>
                      )}
                      
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl">{pacote.nome}</CardTitle>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-rose-600">
                            R$ {pacote.preco}
                          </div>
                          <CardDescription>{pacote.descricao}</CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <ul className="space-y-3">
                          {pacote.inclui.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="space-y-3">
                          <Button 
                            className="w-full" 
                            variant={pacote.destaque ? "default" : "outline"}
                            onClick={() => setSelectedPackage(pacote)}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Agendar Agora
                          </Button>
                          
                          <Button variant="ghost" className="w-full text-sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Tirar Dúvidas
                          </Button>
                        </div>

                        {/* Parcelamento */}
                        <div className="text-xs text-gray-500 space-y-1">
                          <div className="font-medium">Formas de pagamento:</div>
                          <div>À vista: R$ {(pacote.preco * 0.9).toFixed(0)} (10% desc.)</div>
                          <div>3x sem juros: R$ {(pacote.preco / 3).toFixed(0)}</div>
                          <div>Até 12x no cartão</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Final */}
        <div className="mt-20 text-center">
          <Card className="bg-rose-600 text-white">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-4">
                Ainda tem dúvidas sobre qual pacote escolher?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Vamos conversar! Posso te ajudar a escolher o melhor pacote para o seu momento especial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Conversar no WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Conversa
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Servicos

