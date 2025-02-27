
import React, { useState, useRef, useEffect } from 'react';

interface PhoneViewfinderProps {
  children: React.ReactNode;
  onPositionChange: (x: number, progress: number) => void;
  onReset: () => void;
}

const PhoneViewfinder: React.FC<PhoneViewfinderProps> = ({
  children,
  onPositionChange,
  onReset
}) => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, startX: 0, progress: 0.5 });
  const [phoneSize, setPhoneSize] = useState({ width: 300, height: 600 });
  const [constraints, setConstraints] = useState({ min: 0, max: 0 });

  // Calculate the drag constraints based on window size
  useEffect(() => {
    const calculateConstraints = () => {
      if (phoneRef.current && phoneRef.current.parentElement) {
        const parentWidth = phoneRef.current.parentElement.clientWidth;
        const phoneWidth = phoneRef.current.clientWidth;
        
        // Set new phone size based on viewport
        const newWidth = Math.min(300, window.innerWidth * 0.8);
        const newHeight = newWidth * 2;
        setPhoneSize({ width: newWidth, height: newHeight });

        // Calculate constraints (how far the phone can move left and right)
        const maxDistance = parentWidth * 0.35;
        setConstraints({ min: -maxDistance, max: maxDistance });

        // Reset position when constraints change
        handleReset();
      }
    };

    calculateConstraints();
    window.addEventListener('resize', calculateConstraints);

    return () => {
      window.removeEventListener('resize', calculateConstraints);
    };
  }, []);

  const handleReset = () => {
    setPosition({ x: 0, startX: 0, progress: 0.5 });
    onPositionChange(0, 0.5);
  };

  useEffect(() => {
    onReset = handleReset;
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setPosition({ ...position, startX: e.clientX - position.x });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setPosition({ ...position, startX: e.touches[0].clientX - position.x });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - position.startX;
    const clampedX = Math.max(constraints.min, Math.min(constraints.max, newX));
    
    // Calculate progress (0 to 1) based on position within constraints
    const totalRange = constraints.max - constraints.min;
    const progress = (clampedX - constraints.min) / totalRange;
    
    setPosition({ ...position, x: clampedX, progress });
    onPositionChange(clampedX, progress);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const newX = e.touches[0].clientX - position.startX;
    const clampedX = Math.max(constraints.min, Math.min(constraints.max, newX));
    
    // Calculate progress
    const totalRange = constraints.max - constraints.min;
    const progress = (clampedX - constraints.min) / totalRange;
    
    setPosition({ ...position, x: clampedX, progress });
    onPositionChange(clampedX, progress);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, position.startX, constraints]);

  return (
    <div 
      ref={phoneRef}
      className={`relative phone-border select-none transition-shadow ${
        isDragging ? 'shadow-[0_0_30px_rgba(255,255,255,0.2)]' : ''
      }`}
      style={{
        width: `${phoneSize.width}px`,
        height: `${phoneSize.height}px`,
        transform: `translateX(${position.x}px)`,
        transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="phone-notch"></div>
      <div className="phone-button"></div>
      <div className="absolute inset-0 overflow-hidden">
        {children}
      </div>
      <div className="drag-handle"></div>
    </div>
  );
};

export default PhoneViewfinder;
