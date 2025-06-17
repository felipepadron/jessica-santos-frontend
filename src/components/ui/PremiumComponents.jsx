import React from 'react';

// 🎨 Componente Botão Premium
export const ButtonPremium = ({ 
  children, 
  variant = 'gold', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'btn-premium';
  const variantClasses = {
    gold: 'btn-premium-gold',
    outline: 'btn-premium-outline',
  };
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// 🎨 Componente Card Premium
export const CardPremium = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'card-premium';
  const variantClasses = {
    default: '',
    luxury: 'card-premium-luxury',
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 🎨 Componente Input Premium
export const InputPremium = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-js-neutral-700">
          {label}
        </label>
      )}
      <input 
        className={`input-premium ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// 🎨 Componente Heading Premium
export const HeadingPremium = ({ 
  level = 1, 
  children, 
  gradient = false,
  accent = false,
  className = '', 
  ...props 
}) => {
  const Tag = `h${level}`;
  const baseClasses = 'heading-luxury';
  const levelClasses = {
    1: 'heading-1',
    2: 'heading-2',
    3: 'heading-3',
  };
  const gradientClass = gradient ? 'text-gradient-gold' : '';
  const accentClass = accent ? 'gold-accent' : '';

  return (
    <Tag 
      className={`${baseClasses} ${levelClasses[level]} ${gradientClass} ${accentClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

// 🎨 Componente Container Luxury
export const ContainerLuxury = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`luxury-container ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 🎨 Componente Loading Skeleton
export const LoadingSkeleton = ({ 
  width = '100%', 
  height = '20px', 
  className = '' 
}) => {
  return (
    <div 
      className={`loading-skeleton ${className}`}
      style={{ width, height }}
    />
  );
};

// 🎨 Componente Badge Premium
export const BadgePremium = ({ 
  children, 
  variant = 'gold', 
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';
  const variantClasses = {
    gold: 'bg-js-gold-100 text-js-gold-800 border border-js-gold-200',
    neutral: 'bg-js-neutral-100 text-js-neutral-800 border border-js-neutral-200',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// 🎨 Componente Divider Premium
export const DividerPremium = ({ 
  orientation = 'horizontal', 
  className = '' 
}) => {
  const orientationClasses = {
    horizontal: 'w-full h-px',
    vertical: 'h-full w-px',
  };

  return (
    <div 
      className={`bg-gradient-to-r from-transparent via-js-gold-300 to-transparent ${orientationClasses[orientation]} ${className}`}
    />
  );
};

// 🎨 Componente Icon Container Premium
export const IconContainerPremium = ({ 
  children, 
  size = 'md', 
  variant = 'gold', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  const variantClasses = {
    gold: 'bg-js-gold-100 text-js-gold-600',
    neutral: 'bg-js-neutral-100 text-js-neutral-600',
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-xl flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};

// 🎨 Componente Glass Effect
export const GlassEffect = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`glass-effect rounded-xl p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 🎨 Hook para animações
export const useAnimations = () => {
  const fadeInUp = 'animate-fade-in-up';
  const scaleIn = 'animate-scale-in';
  const shimmer = 'animate-shimmer';
  const hoverLift = 'hover-lift';
  const hoverGlow = 'hover-glow';
  const hoverScale = 'hover-scale';

  return {
    fadeInUp,
    scaleIn,
    shimmer,
    hoverLift,
    hoverGlow,
    hoverScale,
  };
};

