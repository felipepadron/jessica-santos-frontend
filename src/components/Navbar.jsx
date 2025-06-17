import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Camera, Instagram, MessageCircle } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Início', path: '/', color: 'js-rose' },
    { name: 'Sobre', path: '/sobre', color: 'js-green' },
    { name: 'Portfólio', path: '/portfolio', color: 'js-brown' },
    { name: 'Serviços', path: '/servicos', color: 'js-beige' },
    { name: 'Contato', path: '/contato', color: 'js-rose' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-js-rose/20">
      <div className="luxury-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-rose rounded-xl flex items-center justify-center shadow-premium group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg lg:text-xl font-bold text-gradient-rose">
                Jéssica Santos
              </div>
              <div className="text-xs lg:text-sm text-js-brown font-medium -mt-1">
                Fotografia
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? `bg-${item.color} text-white shadow-premium`
                    : `text-js-neutral-700 hover:bg-${item.color}/10 hover:text-${item.color}`
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Redes Sociais */}
            <div className="flex items-center space-x-2">
              <a
                href="https://www.instagram.com/oficialjesantos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-js-rose rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                title="Instagram @oficialjesantos"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5199178-7585"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-js-green rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                title="WhatsApp (51) 99178-7585"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {/* CTA Principal */}
            <a
              href="https://wa.me/5199178-7585?text=Olá! Gostaria de agendar um ensaio fotográfico."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rose flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              Agendar Sessão
            </a>

            {/* Acesso Admin */}
            <Link
              to="/dashboard"
              className="w-8 h-8 bg-js-brown rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
              title="Painel Administrativo"
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 bg-js-rose rounded-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-effect border-b border-js-rose/20 shadow-premium-lg">
            <div className="p-4 space-y-3">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? `bg-${item.color} text-white shadow-premium`
                      : `text-js-neutral-700 hover:bg-${item.color}/10`
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-js-neutral-200 space-y-3">
                {/* Redes Sociais */}
                <div className="flex items-center justify-center space-x-4">
                  <a
                    href="https://www.instagram.com/oficialjesantos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-js-rose text-white rounded-lg hover:scale-105 transition-transform"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@oficialjesantos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-js-brown text-white rounded-lg hover:scale-105 transition-transform"
                  >
                    <span className="text-sm font-bold">TT</span>
                    TikTok
                  </a>
                </div>

                {/* CTA Principal */}
                <a
                  href="https://wa.me/5199178-7585?text=Olá! Gostaria de agendar um ensaio fotográfico."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rose w-full flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: (51) 99178-7585
                </a>

                {/* Acesso Admin */}
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="btn-beige w-full flex items-center justify-center gap-2"
                >
                  <div className="w-2 h-2 bg-js-brown rounded-full"></div>
                  Painel Administrativo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

