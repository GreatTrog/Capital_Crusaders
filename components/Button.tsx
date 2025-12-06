import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-display font-bold rounded-xl transition-all duration-200 active:scale-95 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[4px]";
  
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark border-2 border-brand-dark",
    secondary: "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200",
    success: "bg-accent-green text-white hover:brightness-110 border-2 border-green-600",
    outline: "bg-transparent text-brand border-2 border-brand hover:bg-brand-light/20 shadow-none active:translate-y-0"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};