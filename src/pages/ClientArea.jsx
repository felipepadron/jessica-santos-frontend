import React, { useState } from 'react'
import { 
  Download, 
  Eye, 
  Share2, 
  Heart, 
  Star,
  Filter,
  Search,
  Grid,
  List,
  Calendar,
  User,
  Camera,
  Image as ImageIcon,
  Lock,
  Unlock,
  ArrowLeft,
  ZoomIn,
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

const ClientArea = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const animations = useAnimations()

  // Mock data para galeria
  const photos = [
    { id: 1, src: '/api/placeholder/400/600', category: 'gestante', title: 'Ensaio Gestante - Foto 1', date: '2024-05-15', protected: false },
    { id: 2, src: '/api/placeholder/400/600', category: 'gestante', title: 'Ensaio Gestante - Foto 2', date: '2024-05-15', protected: true },
    { id: 3, src: '/api/placeholder/600/400', category: 'newborn', title: 'Newborn - Foto 1', date: '2024-06-01', protected: false },
    { id: 4, src: '/api/placeholder/600/400', category: 'newborn', title: 'Newborn - Foto 2', date: '2024-06-01', protected: true },
    { id: 5, src: '/api/placeholder/400/600', category: 'familia', title: 'Ensaio Família - Foto 1', date: '2024-06-10', protected: false },
    { id: 6, src: '/api/placeholder/600/400', category: 'familia', title: 'Ensaio Família - Foto 2', date: '2024-06-10', protected: false },
  ]

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  const openLightbox = (photo) => {
    setSelectedImage(photo)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-js-neutral-50">
      {/* Header Premium */}
      <header className="bg-white border-b border-js-gold-200/30">
        <ContainerLuxury className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <IconContainerPremium size="lg">
                <Camera className="w-8 h-8" />
              </IconContainerPremium>
              <div>
                <HeadingPremium level={1} className="text-3xl mb-2">
                  Área do Cliente
                </HeadingPremium>
                <p className="text-js-neutral-600">Bem-vinda, Maria! Suas fotos estão prontas.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <BadgePremium>
                <Star className="w-4 h-4 mr-1" />
                Cliente Premium
              </BadgePremium>
              <div className="w-12 h-12 bg-js-gold-500 rounded-full flex items-center justify-center text-white font-semibold">
                MS
              </div>
            </div>
          </div>
        </ContainerLuxury>
      </header>

      <ContainerLuxury className="py-8">
        {/* Stats Cards Premium */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <CardPremium variant="luxury" className={`p-6 text-center ${animations.hoverLift}`}>
            <IconContainerPremium className="mx-auto mb-4">
              <ImageIcon className="w-6 h-6" />
            </IconContainerPremium>
            <div className="text-2xl font-bold text-js-gold-600 mb-2">24</div>
            <div className="text-sm text-js-neutral-600">Fotos Disponíveis</div>
          </CardPremium>

          <CardPremium variant="luxury" className={`p-6 text-center ${animations.hoverLift}`}>
            <IconContainerPremium className="mx-auto mb-4">
              <Download className="w-6 h-6" />
            </IconContainerPremium>
            <div className="text-2xl font-bold text-js-gold-600 mb-2">18</div>
            <div className="text-sm text-js-neutral-600">Downloads Restantes</div>
          </CardPremium>

          <CardPremium variant="luxury" className={`p-6 text-center ${animations.hoverLift}`}>
            <IconContainerPremium className="mx-auto mb-4">
              <Calendar className="w-6 h-6" />
            </IconContainerPremium>
            <div className="text-2xl font-bold text-js-gold-600 mb-2">30</div>
            <div className="text-sm text-js-neutral-600">Dias de Acesso</div>
          </CardPremium>

          <CardPremium variant="luxury" className={`p-6 text-center ${animations.hoverLift}`}>
            <IconContainerPremium className="mx-auto mb-4">
              <Heart className="w-6 h-6" />
            </IconContainerPremium>
            <div className="text-2xl font-bold text-js-gold-600 mb-2">8</div>
            <div className="text-sm text-js-neutral-600">Favoritas</div>
          </CardPremium>
        </div>

        {/* Controls Premium */}
        <CardPremium className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-js-neutral-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar fotos..." 
                  className="pl-10 pr-4 py-2 w-64 bg-js-neutral-50 border border-js-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-js-gold-500 focus:border-transparent"
                />
              </div>
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-js-neutral-50 border border-js-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-js-gold-500 focus:border-transparent"
              >
                <option value="all">Todas as Categorias</option>
                <option value="gestante">Ensaio Gestante</option>
                <option value="newborn">Newborn</option>
                <option value="familia">Ensaio Família</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-js-neutral-100 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-white text-js-gold-600 shadow-sm' : 'text-js-neutral-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-white text-js-gold-600 shadow-sm' : 'text-js-neutral-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <ButtonPremium>
                <Download className="w-4 h-4" />
                Download Selecionadas
              </ButtonPremium>
            </div>
          </div>
        </CardPremium>

        {/* Gallery Premium */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredPhotos.map((photo) => (
            <CardPremium key={photo.id} className={`overflow-hidden group ${animations.hoverLift}`}>
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 bg-js-neutral-200">
                  <div className="w-full h-64 bg-gradient-to-br from-js-gold-100 to-js-gold-200 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-js-gold-400" />
                  </div>
                </div>
                
                {/* Overlay Premium */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => openLightbox(photo)}
                      className="p-3 bg-white rounded-full text-js-neutral-700 hover:text-js-gold-600 transition-all duration-200 hover-scale"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white rounded-full text-js-neutral-700 hover:text-js-gold-600 transition-all duration-200 hover-scale">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white rounded-full text-js-neutral-700 hover:text-js-gold-600 transition-all duration-200 hover-scale">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Protection Badge */}
                {photo.protected && (
                  <div className="absolute top-3 right-3">
                    <BadgePremium variant="neutral">
                      <Lock className="w-3 h-3 mr-1" />
                      Protegida
                    </BadgePremium>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-js-neutral-900 mb-2">{photo.title}</h3>
                <div className="flex items-center justify-between text-sm text-js-neutral-600">
                  <span>{photo.date}</span>
                  <BadgePremium variant="gold">
                    {photo.category}
                  </BadgePremium>
                </div>
              </div>
            </CardPremium>
          ))}
        </div>

        {/* Download Instructions Premium */}
        <CardPremium variant="luxury" className="p-8 mt-12 text-center">
          <IconContainerPremium size="lg" className="mx-auto mb-6">
            <Download className="w-8 h-8" />
          </IconContainerPremium>
          <HeadingPremium level={3} className="text-xl mb-4">
            Como fazer o download das suas fotos
          </HeadingPremium>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="space-y-3">
              <div className="w-8 h-8 bg-js-gold-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <h4 className="font-semibold text-js-neutral-900">Selecione as Fotos</h4>
              <p className="text-js-neutral-600">Clique nas fotos que deseja baixar ou use "Selecionar Todas"</p>
            </div>
            <div className="space-y-3">
              <div className="w-8 h-8 bg-js-gold-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <h4 className="font-semibold text-js-neutral-900">Clique em Download</h4>
              <p className="text-js-neutral-600">Use o botão "Download Selecionadas" para baixar em alta resolução</p>
            </div>
            <div className="space-y-3">
              <div className="w-8 h-8 bg-js-gold-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <h4 className="font-semibold text-js-neutral-900">Aproveite suas Fotos</h4>
              <p className="text-js-neutral-600">Suas fotos estarão prontas para imprimir e compartilhar</p>
            </div>
          </div>
        </CardPremium>
      </ContainerLuxury>

      {/* Lightbox Premium */}
      {lightboxOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button 
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-js-gold-400 transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="bg-gradient-to-br from-js-gold-100 to-js-gold-200 rounded-lg p-8 flex items-center justify-center" style={{width: '600px', height: '400px'}}>
              <ImageIcon className="w-24 h-24 text-js-gold-400" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 rounded-b-lg">
              <h3 className="font-semibold mb-2">{selectedImage.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-75">{selectedImage.date}</span>
                <div className="flex items-center space-x-3">
                  <button className="p-2 bg-js-gold-500 rounded-lg hover:bg-js-gold-600 transition-colors duration-200">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-js-gold-500 rounded-lg hover:bg-js-gold-600 transition-colors duration-200">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientArea

