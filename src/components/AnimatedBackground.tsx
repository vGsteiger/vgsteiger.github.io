import React from 'react';
import { BookOpen, Code, Database, Globe, Terminal, Laptop } from 'lucide-react';

const icons = [BookOpen, Code, Database, Globe, Terminal, Laptop];

interface FloatingIconProps {
  Icon: React.ComponentType<any>;
  style: React.CSSProperties;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ Icon, style }) => (
  <div 
    className="absolute text-gray-400 animate-float opacity-80 hover:opacity-100 transition-opacity"
    style={style}
  >
    <Icon size={35} />
  </div>
);

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {[...Array(20)].map((_, i) => {
        const Icon = icons[i % icons.length];
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const animationDelay = `${(Math.random() * 5).toFixed(2)}s`;
        const animationDuration = `${(12 + Math.random() * 8).toFixed(2)}s`;

        return (
          <FloatingIcon
            key={i}
            Icon={Icon}
            style={{
              left,
              top,
              animationDelay,
              animationDuration,
            }}
          />
        );
      })}
    </div>
  );
};