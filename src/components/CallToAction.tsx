
import React from 'react';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  onReset: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onReset }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 glass-morphism p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in z-10">
      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-semibold text-gradient">
          Experience AR Visualization
        </h2>
        <p className="text-sm md:text-base text-white/70 mt-1">
          Drag the phone to reveal the car in augmented reality
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={onReset}
          variant="outline"
          className="glass-morphism hover:bg-white/10 transition-all"
        >
          Reset View
        </Button>
        <Button className="bg-white text-black hover:bg-white/90 transition-all">
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
