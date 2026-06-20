import React from 'react';
import { Container } from './Container';
import { Sparkles } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-10 md:py-12 relative overflow-hidden border-b-4 border-gold-500">
      {/* Abstract Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-black/20 text-gold-200 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm border border-gold-500/30 shadow-lg shadow-gold-500/10">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-gold-100 uppercase tracking-wider">Premium Bio-Solutions</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-green-50 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-sm">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

