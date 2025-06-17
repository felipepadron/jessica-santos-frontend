import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Camera, Heart, Award, Users, Star, MessageCircle, Instagram } from 'lucide-react'

const Sobre = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Sobre Mim
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Jéssica Santos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fotógrafa especializada em maternidade e família, apaixonada por eternizar momentos únicos e emocionantes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="/api/placeholder/500/600" 
              alt="Jéssica Santos"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Minha História
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Há mais de 5 anos me dedico à arte de capturar momentos únicos e especiais. 
              Minha paixão pela fotografia nasceu quando me tornei mãe e percebi como cada 
              momento é precioso e merece ser eternizado.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Especializo-me em ensaios gestantes, newborn e família, sempre com muito carinho, 
              paciência e técnica para criar memórias que durarão para sempre.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600">500+</div>
                <div className="text-sm text-gray-600">Famílias Atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600">5+</div>
                <div className="text-sm text-gray-600">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600">4.9</div>
                <div className="text-sm text-gray-600">Avaliação Média</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-rose-100 rounded-full w-fit">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
              <CardTitle>Especialização</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Focada em maternidade, newborn e família, com técnicas especializadas para cada momento.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-rose-100 rounded-full w-fit">
                <Award className="w-6 h-6 text-rose-600" />
              </div>
              <CardTitle>Qualidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Equipamentos profissionais e edição cuidadosa para entregar fotos de alta qualidade.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-rose-100 rounded-full w-fit">
                <Users className="w-6 h-6 text-rose-600" />
              </div>
              <CardTitle>Experiência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Atendimento humanizado e personalizado, criando um ambiente confortável para todos.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-rose-600 text-white">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-4">
                Vamos conversar sobre seu momento especial?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Estou aqui para ajudar você a eternizar seus momentos mais preciosos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600">
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sobre

