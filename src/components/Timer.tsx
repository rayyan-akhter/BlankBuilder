
import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    // Reset timer when question changes
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

  const progress = (timeLeft / duration) * 100;
  
  const getProgressColor = () => {
    if (progress > 66) return 'bg-blue';
    if (progress > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-dark">Time Remaining</span>
        <span className="text-sm font-medium text-gray-dark">{timeLeft}s</span>
      </div>
      <div className="timer-container">
        <div 
          className={`timer-progress ${getProgressColor()}`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
