import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  type = 'button',
  fullWidth = false,
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 border border-transparent";
  const widthClasses = fullWidth ? "w-full" : "";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-gold-500 to-gold-400 text-green-950 hover:from-gold-400 hover:to-gold-300 shadow-lg shadow-gold-500/25 border-gold-400/50 hover:-translate-y-0.5",
    secondary: "bg-gradient-to-r from-green-700 to-green-600 text-white hover:from-green-600 hover:to-green-500 shadow-lg shadow-green-700/25 border-green-600/50 hover:-translate-y-0.5",
    outline: "bg-transparent text-green-700 border-green-700 hover:bg-green-50 hover:border-gold-500 hover:text-gold-600",
    white: "bg-white text-green-800 hover:bg-gray-50 shadow-xl border-gray-100 hover:-translate-y-0.5 hover:shadow-gold-500/10",
    glass: "bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md shadow-lg hover:border-gold-400/50 hover:text-gold-200",
  };

  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-base",
  };

  const classes = `${baseClasses} ${widthClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
