import React from 'react';
import { BookOpen, Code, Database, Globe, Terminal, Laptop } from 'lucide-react';

const icons = [BookOpen, Code, Database, Globe, Terminal, Laptop];

interface FloatingIconProps {
  Icon: React.ComponentType<any>;
  style: React.CSSProperties;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ Icon, style }) => (
  <div 
    className="absolute text-gray-500 animate-float"  // Changed color to a more visible shade of gray
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
        const animationDelay = `${Math.random() * 10}s`;
        const animationDuration = `${10 + Math.random() * 10}s`;

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