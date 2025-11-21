import { useRef } from 'react';
import { Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

interface SchoolProps {
  onNotebookClick: (position: [number, number, number]) => void;
  notebookPositions: [number, number, number][];
}

const School = ({ onNotebookClick, notebookPositions }: SchoolProps) => {
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: '#8B7355',
    roughness: 0.8,
  });

  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: '#D4C4A8',
    roughness: 0.9,
  });

  const ceilingMaterial = new THREE.MeshStandardMaterial({ 
    color: '#FFFFFF',
    roughness: 0.7,
  });

  const doorMaterial = new THREE.MeshStandardMaterial({ 
    color: '#8B4513',
    roughness: 0.6,
  });

  return (
    <group>
      <Plane 
        args={[50, 50]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        material={floorMaterial}
      />

      <Plane 
        args={[50, 50]} 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, 5, 0]}
        material={ceilingMaterial}
      />

      <Box args={[50, 5, 0.5]} position={[0, 2.5, -25]} material={wallMaterial} />
      <Box args={[50, 5, 0.5]} position={[0, 2.5, 25]} material={wallMaterial} />
      <Box args={[0.5, 5, 50]} position={[-25, 2.5, 0]} material={wallMaterial} />
      <Box args={[0.5, 5, 50]} position={[25, 2.5, 0]} material={wallMaterial} />

      <Box args={[10, 5, 0.3]} position={[7.5, 2.5, 0]} material={wallMaterial} />
      <Box args={[10, 5, 0.3]} position={[-7.5, 2.5, 0]} material={wallMaterial} />
      
      <Box args={[0.3, 5, 10]} position={[0, 2.5, 7.5]} material={wallMaterial} />
      <Box args={[0.3, 5, 10]} position={[0, 2.5, -7.5]} material={wallMaterial} />

      <Box args={[2, 3.5, 0.2]} position={[3, 1.75, 0]} material={doorMaterial} />
      <Box args={[2, 3.5, 0.2]} position={[-3, 1.75, 0]} material={doorMaterial} />

      {notebookPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          <Box 
            args={[0.3, 0.4, 0.05]} 
            onClick={() => onNotebookClick(pos)}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'default';
            }}
          >
            <meshStandardMaterial color="#4169E1" />
          </Box>
          
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}

      <Box args={[1, 0.8, 0.5]} position={[10, 0.4, 10]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[1, 0.8, 0.5]} position={[-10, 0.4, 10]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[1, 0.8, 0.5]} position={[10, 0.4, -10]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[1, 0.8, 0.5]} position={[-10, 0.4, -10]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>

      <Box args={[3, 2, 0.1]} position={[15, 2.5, 0]}>
        <meshStandardMaterial color="#2C5F2D" />
      </Box>
    </group>
  );
};

export default School;
