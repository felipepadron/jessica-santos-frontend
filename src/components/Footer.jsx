import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Phone, Mail, MapPin, Settings, User, Calendar } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-900 to-amber-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-amber-900 font-bold text-lg">JS</span>
              </div>
              <div>
                <h3 className="font-serif font-semibold text-xl">Jéssica Santos</h3>
                <p className="text-amber-200 text-sm">Fotografia</p>
              </div>
            </div>
            <p className="text-amber-100 text-sm leading-relaxed">
              Especializada em fotografia de gestantes, newborn e família. 
              Eternizando momentos únicos com sensibilidade e técnica profissional.
            </p>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Serviços</h4>
            <ul className="space-y-2 text-amber-100">
              <li><Link to="/servicos" className="hover:text-white transition-colors">Ensaio Gestante</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors">Newborn</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors">Ensaio Família</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors">Mentoria Fotográfica</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <div className="space-y-3 text-amber-100">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contato@jessicasantos.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Redes Sociais e Acessos */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Conecte-se</h4>
            
            {/* Redes Sociais */}
            <div className="flex space-x-3 mb-6">
              <a 
                href="https://instagram.com/jessicasantosfotografia" 
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="tel:+5511999999999" 
                className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contato@jessicasantos.com" 
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Acessos Administrativos */}
            <div className="space-y-2">
              <h5 className="font-medium text-amber-200 text-sm mb-3">Área Restrita</h5>
              
              {/* Acesso Administrativo */}
              <Link 
                to="/login" 
                className="flex items-center space-x-2 text-amber-200 hover:text-white transition-colors text-sm group"
              >
                <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                <span>Painel Administrativo</span>
              </Link>
              
              {/* Área do Cliente */}
              <Link 
                to="/area-cliente" 
                className="flex items-center space-x-2 text-amber-200 hover:text-white transition-colors text-sm group"
              >
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Área do Cliente</span>
              </Link>
              
              {/* Agendamento Rápido */}
              <Link 
                to="/agendamento" 
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-400 text-amber-900 px-3 py-2 rounded-lg hover:from-amber-400 hover:to-amber-300 transition-all text-sm font-medium"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Agora</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-amber-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-200 text-sm">
              © 2024 Jéssica Santos Fotografia. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link to="/privacidade" className="text-amber-200 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="text-amber-200 hover:text-white text-sm transition-colors">
                Termos de Uso
              </Link>
              {/* Acesso Rápido Admin (Discreto) */}
              <Link 
                to="/configuracao-sistema" 
                className="text-amber-300 hover:text-amber-100 text-xs transition-colors opacity-70 hover:opacity-100"
                title="Configurações do Sistema"
              >
                ⚙️
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

