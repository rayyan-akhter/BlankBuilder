
import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    // Reset timer when question changes or when isActive changes
    setTimeLeft(duration);
  }, [duration, isActive]);

  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, isActive]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate progress percentage
  const progress = (timeLeft / duration) * 100;

  return (
    <div className="flex items-center">
      <div className="text-xl font-medium">
        {formatTime(timeLeft)}
      </div>
      
      {/* Circular progress indicator */}
      <div className="ml-2 relative h-1.5 bg-gray-200 rounded-full w-10">
        <div 
          className="absolute top-0 left-0 h-full bg-amber-500 rounded-full transition-all" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
