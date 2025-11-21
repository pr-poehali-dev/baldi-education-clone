import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Sky, useTexture } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { Vector3, Euler } from 'three';
import * as THREE from 'three';
import School from './School';
import Baldi from './Baldi';
import NotebookModal from './NotebookModal';
import MobileControls from './MobileControls';

interface Game3DProps {
  onExit: () => void;
}

const Game3D = ({ onExit }: Game3DProps) => {
  const [notebooks, setNotebooks] = useState(7);
  const [baldiAngry, setBaldiAngry] = useState(0);
  const [showNotebook, setShowNotebook] = useState(false);
  const [currentNotebookPos, setCurrentNotebookPos] = useState<[number, number, number]>([0, 0, 0]);
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 1.6, 5]);
  const [isMobile, setIsMobile] = useState(false);
  const [movement, setMovement] = useState({ forward: 0, right: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const notebookPositions: [number, number, number][] = [
    [5, 1, 5],
    [-5, 1, 5],
    [5, 1, -5],
    [-5, 1, -5],
    [10, 1, 0],
    [-10, 1, 0],
    [0, 1, -10],
  ];

  const handleNotebookClick = (position: [number, number, number]) => {
    setCurrentNotebookPos(position);
    setShowNotebook(true);
  };

  const handleAnswerSubmit = (correct: boolean) => {
    if (correct) {
      setNotebooks(notebooks - 1);
      setShowNotebook(false);
      
      if (notebooks - 1 === 0) {
        alert('Поздравляю! Ты собрал все блокноты! Беги к выходу!');
      }
    } else {
      setBaldiAngry(baldiAngry + 1);
      setShowNotebook(false);
      alert('Неправильно! Балди злится!');
    }
  };

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ fov: 75, position: playerPos }}
        onCreated={({ gl }) => {
          gl.setClearColor('#87CEEB');
        }}
      >
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {!isMobile && <PointerLockControls />}
        
        <School onNotebookClick={handleNotebookClick} notebookPositions={notebookPositions} />
        <Baldi angerLevel={baldiAngry} playerPosition={playerPos} />
      </Canvas>

      {showNotebook && (
        <NotebookModal
          onClose={() => setShowNotebook(false)}
          onSubmit={handleAnswerSubmit}
        />
      )}

      {isMobile && (
        <MobileControls
          onMove={setMovement}
          onInteract={() => {
            const nearby = notebookPositions.find(pos => {
              const dist = Math.sqrt(
                Math.pow(pos[0] - playerPos[0], 2) + 
                Math.pow(pos[2] - playerPos[2], 2)
              );
              return dist < 3;
            });
            if (nearby) handleNotebookClick(nearby);
          }}
        />
      )}

      <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-lg">
        <div className="text-xl font-bold mb-2">Блокнотов: {notebooks}/7</div>
        <div className="text-sm">Злость Балди: {'😠'.repeat(baldiAngry)}</div>
        <button
          onClick={onExit}
          className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
        >
          Выход в меню
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg text-center">
        {isMobile ? 'Используй джойстик для движения' : 'WASD - движение, Мышь - осмотр, E - взаимодействие'}
      </div>
    </div>
  );
};

export default Game3D;
