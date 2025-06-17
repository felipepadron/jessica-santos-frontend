import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Camera, Heart, Users, Baby, Instagram, MessageCircle } from 'lucide-react'

const Galeria = () => {
  const categorias = [
    {
      nome: 'Ensaios Gestante',
      icone: <Heart className="w-6 h-6" />,
      descricao: 'Momentos únicos da maternidade',
      fotos: 12
    },
    {
      nome: 'Newborn',
      icone: <Baby className="w-6 h-6" />,
      descricao: 'Primeiros dias de vida',
      fotos: 18
    },
    {
      nome: 'Família',
      icone: <Users className="w-6 h-6" />,
      descricao: 'Amor em família',
      fotos: 15
    }
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Portfolio
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Galeria de Momentos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada foto conta uma história única. Veja alguns dos momentos especiais que tive o privilégio de eternizar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categorias.map((categoria, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-rose-100 rounded-full w-fit">
                  {categoria.icone}
                </div>
                <CardTitle>{categoria.nome}</CardTitle>
                <CardDescription>{categoria.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <img 
                    src="/api/placeholder/300/400" 
                    alt={categoria.nome}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {categoria.fotos} fotos nesta categoria
                </p>
                <Button variant="outline" className="w-full">
                  Ver Galeria
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-rose-600 text-white">
            <CardContent className="py-12">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Quer ver mais do meu trabalho?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Siga-me no Instagram para ver mais fotos e bastidores dos ensaios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <Instagram className="w-5 h-5 mr-2" />
                  @jessicasantosfoto
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Conversar no WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Galeria

