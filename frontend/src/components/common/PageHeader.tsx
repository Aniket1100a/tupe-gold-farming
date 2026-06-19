import React from 'react';
import { Container } from './Container';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-gray-50 py-16 md:py-24 border-b border-gray-200">
      <Container className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{title}</h1>
        {subtitle && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
};
