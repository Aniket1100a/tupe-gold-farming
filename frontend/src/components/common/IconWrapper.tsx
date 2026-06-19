import React, { ReactNode } from 'react';

interface IconWrapperProps {
  icon: ReactNode;
  variant?: 'light' | 'white';
  className?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon, 
  variant = 'light',
  className = ''
}) => {
  const variantStyles = {
    light: "bg-green-50 text-green-600",
    white: "bg-white text-green-600 shadow-sm border border-gray-100"
  };

  return (
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${variantStyles[variant]} ${className}`}>
      {icon}
    </div>
  );
};
