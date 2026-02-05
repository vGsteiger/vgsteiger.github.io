import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-br from-blue-500/80 to-blue-600/80 backdrop-blur-sm border border-blue-400/50 text-white rounded-full hover:from-blue-600/90 hover:to-blue-700/90 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};
