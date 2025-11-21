import { useState, useRef, useEffect, TouchEvent } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MobileControlsProps {
  onMove: (movement: { forward: number; right: number }) => void;
  onInteract: () => void;
}

const MobileControls = ({ onMove, onInteract }: MobileControlsProps) => {
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !joystickRef.current) return;

    const touch = e.touches[0];
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let x = touch.clientX - centerX;
    let y = touch.clientY - centerY;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 50;

    if (distance > maxDistance) {
      x = (x / distance) * maxDistance;
      y = (y / distance) * maxDistance;
    }

    setJoystickPos({ x, y });

    const normalizedX = x / maxDistance;
    const normalizedY = y / maxDistance;

    onMove({
      forward: -normalizedY,
      right: normalizedX,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setJoystickPos({ x: 0, y: 0 });
    onMove({ forward: 0, right: 0 });
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-8 left-8 pointer-events-auto">
        <div
          ref={joystickRef}
          className="relative w-32 h-32 bg-black/30 rounded-full border-4 border-white/50"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="absolute w-12 h-12 bg-white/80 rounded-full shadow-lg transition-transform"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${joystickPos.x}px), calc(-50% + ${joystickPos.y}px))`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm font-bold">
            MOVE
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col gap-4 pointer-events-auto">
        <Button
          size="lg"
          className="w-20 h-20 rounded-full bg-blue-500 hover:bg-blue-600 shadow-xl"
          onClick={onInteract}
        >
          <Icon name="Hand" size={32} />
        </Button>
        
        <div className="text-center text-white text-xs font-bold bg-black/50 px-3 py-1 rounded">
          INTERACT
        </div>
      </div>

      <div className="absolute top-1/2 right-8 pointer-events-auto">
        <div className="bg-black/30 rounded-full p-4 border-4 border-white/50">
          <div className="text-white/50 text-xs font-bold text-center">LOOK</div>
          <div className="text-white/70 text-xs text-center mt-2">Сенсор</div>
        </div>
      </div>
    </div>
  );
};

export default MobileControls;
