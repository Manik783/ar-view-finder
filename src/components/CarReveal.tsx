
import React, { useEffect, useState, useRef } from 'react';

interface CarRevealProps {
  progress: number;
}

const CarReveal: React.FC<CarRevealProps> = ({ progress }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Calculate the position of the car image based on the drag progress
  // Using a smoother transition curve for more natural movement
  const carPosition = progress * 100;

  useEffect(() => {
    const img = new Image();
    img.src = 'https://wallpapercave.com/wp/SsbQqtk.jpg';
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setError('Failed to load car image');
      console.error('Failed to load car image');
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-black/40 text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-white animate-spin"></div>
        </div>
      )}
      
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          ref={imageRef}
          src="https://wallpapercave.com/wp/SsbQqtk.jpg"
          alt="Car in AR view"
          className="absolute object-cover min-w-[200%] h-full"
          style={{
            transform: `translateX(${-carPosition * 1.5}%)`,
            objectPosition: `${carPosition}% center`,
            willChange: 'transform',
            transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        />
        
        {/* Grain overlay for realistic effect */}
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none"></div>
        
        {/* AR UI elements */}
        <div className="absolute bottom-4 right-4 glass-morphism px-2 py-1 rounded-md text-xs flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span>AR Active</span>
        </div>
      </div>
    </div>
  );
};

export default CarReveal;
