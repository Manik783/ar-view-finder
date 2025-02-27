
import React from 'react';

interface ProgressIndicatorProps {
  progress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress }) => {
  return (
    <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-64 flex flex-col items-center opacity-70 animate-fade-in">
      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-200 ease-out"
          style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
        />
      </div>
      <div className="mt-2 text-white/70 text-sm">
        Drag to explore {Math.round(progress * 100)}%
      </div>
    </div>
  );
};

export default ProgressIndicator;
