import React, { useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../assets/hero-animation.json';

interface OrbComponentProps {
  onStateChange: (state: 'idle' | 'listening' | 'result') => void;
  emotion: string;
  confidence: number;
}

const OrbComponent: React.FC<OrbComponentProps> = ({ onStateChange, emotion, confidence }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentState, setCurrentState] = useState<'idle' | 'listening' | 'result'>('idle');

  const handleClick = () => {
    if (currentState === 'idle' || currentState === 'result') {
      setCurrentState('listening');
      setIsPlaying(true);
      onStateChange('listening');
    } else if (currentState === 'listening') {
      setCurrentState('result');
      setIsPlaying(false);
      onStateChange('result');
    }
  };

  return (
    <div 
      className="w-96 h-96 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
      onClick={handleClick}
    >
      <Lottie
        animationData={animationData}
        play={isPlaying}
        loop={isPlaying}
        style={{ 
          width: '100%', 
          height: '100%',
          filter: currentState === 'listening' ? 'brightness(1.2)' : 'none'
        }}
      />
    </div>
  );
};

export default OrbComponent; 