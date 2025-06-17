import React from 'react';

// ===== COMPONENTES AUTÊNTICOS JÉSSICA SANTOS =====

// Hook para animações suaves
export const useAnimations = () => ({
  hoverLift: 'hover-lift',
  hoverScale: 'hover-scale',
  fadeInUp: 'animate-fade-in-up',
  pulseSoft: 'animate-pulse-soft'
});

// Container Luxury Autêntico
export const ContainerLuxury = ({ children, className = '', ...props }) => (
  <div className={`luxury-container ${className}`} {...props}>
    {children}
  </div>
);

// Headings com Gradiente Feminino
export const HeadingAuthentic = ({ 
  level = 1, 
  children, 
  className = '', 
  gradient = false,
  ...props 
}) => {
  const Tag = `h${level}`;
  const baseClasses = 'font-semibold leading-tight';
  const gradientClass = gradient ? 'text-gradient-rose' : 'text-js-neutral-800';
  
  const sizeClasses = {
    1: 'text-4xl md:text-5xl',
    2: 'text-3xl md:text-4xl', 
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg'
  };
  
  return (
    <Tag 
      className={`${baseClasses} ${sizeClasses[level]} ${gradientClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

// Card Feminino Premium
export const CardFeminine = ({ 
  children, 
  variant = 'default',
  className = '', 
  ...props 
}) => {
  const variants = {
    default: 'card-feminine',
    luxury: 'card-feminine bg-gradient-to-br from-js-white to-js-beige-light',
    rose: 'card-feminine bg-gradient-to-br from-js-rose-light to-js-white',
    natural: 'card-feminine bg-gradient-to-br from-js-green-light to-js-white'
  };
  
  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Botão Premium Autêntico
export const ButtonAuthentic = ({ 
  children, 
  variant = 'rose',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props 
}) => {
  const variants = {
    rose: 'btn-rose',
    beige: 'btn-beige',
    outline: 'border-2 border-js-rose text-js-rose bg-transparent hover:bg-js-rose hover:text-white',
    ghost: 'text-js-brown hover:bg-js-beige-light'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-js-rose focus:ring-offset-2';
  
  return (
    <Component 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// Container de Ícone Feminino
export const IconContainerFeminine = ({ 
  children, 
  size = 'md',
  variant = 'rose',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  const variants = {
    rose: 'bg-js-rose text-white',
    beige: 'bg-js-beige text-js-brown',
    green: 'bg-js-green text-white',
    gradient: 'bg-gradient-to-br from-js-rose to-js-brown text-white'
  };
  
  return (
    <div 
      className={`${sizes[size]} ${variants[variant]} rounded-xl flex items-center justify-center shadow-premium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Badge Suave
export const BadgeFeminine = ({ 
  children, 
  variant = 'rose',
  className = '',
  ...props 
}) => {
  const variants = {
    rose: 'badge-rose',
    green: 'badge-green',
    neutral: 'bg-js-neutral-100 text-js-neutral-700',
    beige: 'bg-js-beige text-js-brown'
  };
  
  return (
    <span className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Input Elegante
export const InputElegant = ({ 
  className = '',
  ...props 
}) => (
  <input 
    className={`input-elegant ${className}`}
    {...props}
  />
);

// Textarea Elegante
export const TextareaElegant = ({ 
  className = '',
  ...props 
}) => (
  <textarea 
    className={`input-elegant resize-none ${className}`}
    {...props}
  />
);

// Select Elegante
export const SelectElegant = ({ 
  children,
  className = '',
  ...props 
}) => (
  <select 
    className={`input-elegant ${className}`}
    {...props}
  >
    {children}
  </select>
);

// Divider Suave
export const DividerSoft = ({ className = '', ...props }) => (
  <hr className={`border-js-neutral-200 ${className}`} {...props} />
);

// Loading Spinner Feminino
export const LoadingFeminine = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-js-rose border-t-transparent"></div>
    </div>
  );
};

// Avatar Feminino
export const AvatarFeminine = ({ 
  src,
  alt,
  size = 'md',
  fallback,
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  if (src) {
    return (
      <img 
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover border-2 border-js-rose-light ${className}`}
        {...props}
      />
    );
  }
  
  return (
    <div 
      className={`${sizes[size]} rounded-full bg-js-rose text-white flex items-center justify-center font-semibold ${className}`}
      {...props}
    >
      {fallback}
    </div>
  );
};

// Tooltip Suave
export const TooltipSoft = ({ 
  children, 
  content,
  position = 'top',
  className = '' 
}) => {
  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };
  
  return (
    <div className="relative group">
      {children}
      <div className={`absolute ${positions[position]} opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50`}>
        <div className="glass-effect px-3 py-2 rounded-lg text-sm text-js-neutral-700 whitespace-nowrap shadow-premium">
          {content}
        </div>
      </div>
    </div>
  );
};

// Modal Feminino
export const ModalFeminine = ({ 
  isOpen, 
  onClose, 
  children,
  title,
  className = '' 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-js-neutral-900 bg-opacity-50"
          onClick={onClose}
        />
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform glass-effect rounded-2xl shadow-premium-lg">
          {title && (
            <div className="flex items-center justify-between mb-4">
              <HeadingAuthentic level={3}>{title}</HeadingAuthentic>
              <button
                onClick={onClose}
                className="text-js-neutral-400 hover:text-js-neutral-600 transition-colors"
              >
                ✕
              </button>
            </div>
          )}
          
          <div className={className}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Progress Bar Feminino
export const ProgressFeminine = ({ 
  value = 0, 
  max = 100,
  className = '',
  showLabel = false 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-js-neutral-600 mb-1">
          <span>Progresso</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-js-neutral-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-js-rose to-js-brown h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default {
  ContainerLuxury,
  HeadingAuthentic,
  CardFeminine,
  ButtonAuthentic,
  IconContainerFeminine,
  BadgeFeminine,
  InputElegant,
  TextareaElegant,
  SelectElegant,
  DividerSoft,
  LoadingFeminine,
  AvatarFeminine,
  TooltipSoft,
  ModalFeminine,
  ProgressFeminine,
  useAnimations
};

