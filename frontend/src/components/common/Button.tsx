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
  const baseClasses = "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-colors shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600";
  const widthClasses = fullWidth ? "w-full" : "";
  
  const variantClasses = {
    primary: "bg-green-700 text-white hover:bg-green-800 shadow-md",
    secondary: "bg-green-500 text-white hover:bg-green-400 shadow-md",
    outline: "bg-transparent text-green-700 border border-green-700 hover:bg-green-50",
    white: "bg-white text-green-800 hover:bg-gray-100 shadow-xl",
    glass: "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md shadow-lg",
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
