
import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import PhoneViewfinder from '@/components/PhoneViewfinder';
import CarReveal from '@/components/CarReveal';
import CallToAction from '@/components/CallToAction';
import ProgressIndicator from '@/components/ui/ProgressIndicator';

const Index = () => {
  const [viewPosition, setViewPosition] = useState(0);
  const [viewProgress, setViewProgress] = useState(0.5);
  const [resetHandler, setResetHandler] = useState<() => void>(() => {});

  const handlePositionChange = useCallback((x: number, progress: number) => {
    setViewPosition(x);
    setViewProgress(progress);
  }, []);

  const registerResetHandler = useCallback((handler: () => void) => {
    setResetHandler(() => handler);
  }, []);

  const handleReset = useCallback(() => {
    resetHandler();
  }, [resetHandler]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-background to-black overflow-hidden">
      <Header />
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}
        ></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/10 filter blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 filter blur-[100px] animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>
      
      <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block glass-morphism px-3 py-1.5 rounded-full text-xs tracking-wide text-white/80 mb-3">
            AR EXPERIENCE
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient">
            Discover the Future
          </h1>
          <p className="text-white/70 max-w-md mx-auto text-lg">
            Drag the viewer to reveal the car in augmented reality
          </p>
        </div>
        
        <div className="relative w-full max-w-6xl h-[60vh] flex items-center justify-center mb-12">
          {/* This div holds the full car image for reference (not visible to user) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
            <img 
              src="https://dcfvgbhj.netlify.app/car.jpeg" 
              alt="Reference car" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Phone viewfinder with mask effect */}
          <PhoneViewfinder 
            onPositionChange={handlePositionChange}
            onReset={resetHandler}
          >
            <CarReveal progress={viewProgress} />
          </PhoneViewfinder>
          
          {/* Progress indicator */}
          <ProgressIndicator progress={viewProgress} />
        </div>
        
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Experience our next-generation AR technology that lets you visualize 
            products in your space before making a purchase.
          </p>
        </div>
      </div>
      
      <CallToAction onReset={handleReset} />
    </main>
  );
};

export default Index;
