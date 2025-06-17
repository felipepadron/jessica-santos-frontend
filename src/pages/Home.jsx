import React from 'react'
import { Camera, Heart, Star, Users, Calendar, Instagram, MessageCircle, MapPin } from 'lucide-react'
import { 
  ContainerLuxury, 
  HeadingAuthentic, 
  CardFeminine, 
  ButtonAuthentic,
  IconContainerFeminine,
  BadgeFeminine
} from '../components/ui/AuthenticComponents'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-js-beige-light via-js-white to-js-rose-light">
      {/* Hero Section Autêntico */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-js-beige/20 to-js-rose/10"></div>
        
        <ContainerLuxury className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo Principal */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <BadgeFeminine variant="rose" className="inline-flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Fotógrafa Especialista em Retratos Femininos
                </BadgeFeminine>
                
                <HeadingAuthentic level={1} gradient className="leading-tight">
                  Jéssica Santos
                </HeadingAuthentic>
                
                <HeadingAuthentic level={2} className="text-js-brown font-light">
                  Fotografia
                </HeadingAuthentic>
                
                <p className="text-lg text-js-neutral-600 leading-relaxed max-w-lg">
                  Eternizando momentos únicos da maternidade e família com 
                  <span className="text-js-rose font-medium"> sensibilidade</span>, 
                  <span className="text-js-green font-medium"> técnica</span> e 
                  <span className="text-js-brown font-medium"> muito amor</span>. 
                  Cada foto conta uma história especial.
                </p>
                
                <div className="flex items-center gap-2 text-js-neutral-600">
                  <MapPin className="w-5 h-5 text-js-rose" />
                  <span>ABC, São Paulo</span>
                </div>
              </div>
              
              {/* CTAs Principais */}
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonAuthentic 
                  variant="rose" 
                  size="lg"
                  className="group"
                  as="a"
                  href="https://wa.me/5199178-7585?text=Olá! Gostaria de agendar um ensaio fotográfico."
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Agendar Ensaio
                </ButtonAuthentic>
                
                <ButtonAuthentic 
                  variant="outline" 
                  size="lg"
                  className="group"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Ver Portfolio
                </ButtonAuthentic>
              </div>
              
              {/* Redes Sociais */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-sm text-js-neutral-500">Siga-me:</span>
                <div className="flex gap-3">
                  <a 
                    href="https://www.instagram.com/oficialjesantos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-js-rose rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@oficialjesantos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-js-brown rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <span className="text-sm font-bold">TT</span>
                  </a>
                  <a 
                    href="https://www.pinterest.com/admjefotos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-js-green rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <span className="text-sm font-bold">P</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Imagem Hero */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-premium-lg">
                <img 
                  src="/src/assets/jessica-hero-authentic.jpg"
                  alt="Jéssica Santos - Fotógrafa especialista em retratos femininos"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-js-brown/20 to-transparent"></div>
              </div>
              
              {/* Elementos Decorativos */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-js-rose rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-js-green rounded-full opacity-15 animate-float" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </ContainerLuxury>
      </section>
      
      {/* Métricas de Credibilidade */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <ContainerLuxury>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <IconContainerFeminine variant="rose" size="lg" className="mx-auto">
                <Star className="w-6 h-6" />
              </IconContainerFeminine>
              <div className="text-3xl font-bold text-js-brown">4.9</div>
              <div className="text-sm text-js-neutral-600">127 avaliações</div>
            </div>
            
            <div className="text-center space-y-2">
              <IconContainerFeminine variant="green" size="lg" className="mx-auto">
                <Heart className="w-6 h-6" />
              </IconContainerFeminine>
              <div className="text-3xl font-bold text-js-brown">+500</div>
              <div className="text-sm text-js-neutral-600">famílias atendidas</div>
            </div>
            
            <div className="text-center space-y-2">
              <IconContainerFeminine variant="beige" size="lg" className="mx-auto">
                <Camera className="w-6 h-6" />
              </IconContainerFeminine>
              <div className="text-3xl font-bold text-js-brown">8</div>
              <div className="text-sm text-js-neutral-600">anos de experiência</div>
            </div>
            
            <div className="text-center space-y-2">
              <IconContainerFeminine variant="gradient" size="lg" className="mx-auto">
                <Users className="w-6 h-6" />
              </IconContainerFeminine>
              <div className="text-3xl font-bold text-js-brown">17.1K</div>
              <div className="text-sm text-js-neutral-600">seguidores TikTok</div>
            </div>
          </div>
        </ContainerLuxury>
      </section>
      
      {/* Serviços Especializados */}
      <section className="py-20">
        <ContainerLuxury>
          <div className="text-center space-y-4 mb-16">
            <HeadingAuthentic level={2} className="text-js-brown">
              Serviços Especializados
            </HeadingAuthentic>
            <p className="text-lg text-js-neutral-600 max-w-2xl mx-auto">
              Cada ensaio é único e personalizado para capturar a essência e beleza de cada mulher
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Retratos Femininos */}
            <CardFeminine variant="rose" className="text-center space-y-6 group hover:scale-105 transition-transform">
              <IconContainerFeminine variant="rose" size="xl" className="mx-auto">
                <Camera className="w-8 h-8" />
              </IconContainerFeminine>
              
              <div className="space-y-3">
                <HeadingAuthentic level={3} className="text-js-brown">
                  Retratos Femininos
                </HeadingAuthentic>
                <p className="text-js-neutral-600">
                  Ensaios individuais que destacam a beleza natural e personalidade única de cada mulher
                </p>
                <div className="text-2xl font-bold text-js-rose">A partir de R$ 350</div>
              </div>
              
              <ButtonAuthentic variant="rose" className="w-full">
                Saiba Mais
              </ButtonAuthentic>
            </CardFeminine>
            
            {/* Book Profissional */}
            <CardFeminine variant="natural" className="text-center space-y-6 group hover:scale-105 transition-transform">
              <IconContainerFeminine variant="green" size="xl" className="mx-auto">
                <Star className="w-8 h-8" />
              </IconContainerFeminine>
              
              <div className="space-y-3">
                <HeadingAuthentic level={3} className="text-js-brown">
                  Book Profissional
                </HeadingAuthentic>
                <p className="text-js-neutral-600">
                  Ensaios completos para modelos, atrizes e profissionais que precisam de um portfolio impactante
                </p>
                <div className="text-2xl font-bold text-js-green">A partir de R$ 550</div>
              </div>
              
              <ButtonAuthentic variant="beige" className="w-full">
                Saiba Mais
              </ButtonAuthentic>
            </CardFeminine>
            
            {/* Ensaio Lifestyle */}
            <CardFeminine variant="luxury" className="text-center space-y-6 group hover:scale-105 transition-transform">
              <IconContainerFeminine variant="beige" size="xl" className="mx-auto">
                <Heart className="w-8 h-8" />
              </IconContainerFeminine>
              
              <div className="space-y-3">
                <HeadingAuthentic level={3} className="text-js-brown">
                  Ensaio Lifestyle
                </HeadingAuthentic>
                <p className="text-js-neutral-600">
                  Fotografias naturais e espontâneas que capturam momentos autênticos do dia a dia
                </p>
                <div className="text-2xl font-bold text-js-brown">A partir de R$ 450</div>
              </div>
              
              <ButtonAuthentic variant="outline" className="w-full">
                Saiba Mais
              </ButtonAuthentic>
            </CardFeminine>
          </div>
        </ContainerLuxury>
      </section>
      
      {/* Depoimentos */}
      <section className="py-20 bg-gradient-to-r from-js-beige to-js-rose-light">
        <ContainerLuxury>
          <div className="text-center space-y-4 mb-16">
            <HeadingAuthentic level={2} className="text-js-brown">
              O que dizem sobre meu trabalho
            </HeadingAuthentic>
            <p className="text-lg text-js-neutral-600">
              Depoimentos reais de clientes satisfeitas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                nome: "Maria Silva",
                tipo: "Ensaio Individual",
                depoimento: "Jéssica capturou momentos únicos e me fez sentir linda e confiante. Profissionalismo e sensibilidade em cada foto.",
                rating: 5
              },
              {
                nome: "Ana Costa",
                tipo: "Book Profissional", 
                depoimento: "Resultado incrível! As fotos ficaram perfeitas para meu portfolio. Recomendo de olhos fechados!",
                rating: 5
              },
              {
                nome: "Carla Santos",
                tipo: "Ensaio Lifestyle",
                depoimento: "Experiência maravilhosa! Jéssica tem um olhar único e consegue capturar a essência de cada momento.",
                rating: 5
              }
            ].map((depoimento, index) => (
              <CardFeminine key={index} className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(depoimento.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-js-rose text-js-rose" />
                  ))}
                </div>
                
                <p className="text-js-neutral-700 italic">
                  "{depoimento.depoimento}"
                </p>
                
                <div className="border-t border-js-neutral-200 pt-4">
                  <div className="font-semibold text-js-brown">{depoimento.nome}</div>
                  <div className="text-sm text-js-neutral-500">{depoimento.tipo}</div>
                </div>
              </CardFeminine>
            ))}
          </div>
        </ContainerLuxury>
      </section>
      
      {/* CTA Final */}
      <section className="py-20 bg-js-brown text-white">
        <ContainerLuxury>
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <HeadingAuthentic level={2} className="text-white">
              Pronta para seu ensaio dos sonhos?
            </HeadingAuthentic>
            
            <p className="text-xl text-js-beige-light">
              Entre em contato e vamos criar juntas memórias que durarão para sempre
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonAuthentic 
                variant="rose" 
                size="lg"
                as="a"
                href="https://wa.me/5199178-7585?text=Olá Jéssica! Gostaria de agendar um ensaio fotográfico."
                className="group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                WhatsApp: (51) 99178-7585
              </ButtonAuthentic>
              
              <ButtonAuthentic 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-js-brown"
              >
                <Calendar className="w-5 h-5" />
                Agendar Consulta
              </ButtonAuthentic>
            </div>
          </div>
        </ContainerLuxury>
      </section>
    </div>
  )
}

