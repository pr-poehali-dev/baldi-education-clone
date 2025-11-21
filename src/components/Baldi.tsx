import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface BaldiProps {
  angerLevel: number;
  playerPosition: [number, number, number];
}

const Baldi = ({ angerLevel, playerPosition }: BaldiProps) => {
  const baldiRef = useRef<THREE.Group>(null);
  const speed = 0.02 + (angerLevel * 0.01);

  useFrame(() => {
    if (baldiRef.current) {
      const direction = new THREE.Vector3(
        playerPosition[0] - baldiRef.current.position.x,
        0,
        playerPosition[2] - baldiRef.current.position.z
      ).normalize();

      baldiRef.current.position.x += direction.x * speed;
      baldiRef.current.position.z += direction.z * speed;

      const angle = Math.atan2(direction.x, direction.z);
      baldiRef.current.rotation.y = angle;

      const distance = Math.sqrt(
        Math.pow(playerPosition[0] - baldiRef.current.position.x, 2) +
        Math.pow(playerPosition[2] - baldiRef.current.position.z, 2)
      );

      if (distance < 2) {
        alert('Балди поймал тебя! Игра окончена!');
      }
    }
  });

  const skinColor = angerLevel > 3 ? '#FF6B6B' : angerLevel > 1 ? '#FFA07A' : '#FFD4A3';
  const eyeColor = angerLevel > 2 ? '#FF0000' : '#000000';

  return (
    <group ref={baldiRef} position={[-15, 0, -15]}>
      <Sphere args={[0.4, 16, 16]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color={skinColor} />
      </Sphere>

      <Sphere args={[0.08, 8, 8]} position={[-0.15, 1.7, 0.3]}>
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={angerLevel > 2 ? 0.5 : 0} />
      </Sphere>
      <Sphere args={[0.08, 8, 8]} position={[0.15, 1.7, 0.3]}>
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={angerLevel > 2 ? 0.5 : 0} />
      </Sphere>

      <Box args={[0.6, 0.2, 0.05]} position={[0, 1.5, 0.35]} rotation={[angerLevel > 1 ? -0.3 : 0.1, 0, 0]}>
        <meshStandardMaterial color="#8B0000" />
      </Box>

      <Box args={[0.5, 1, 0.3]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#4169E1" />
      </Box>

      <Box args={[0.15, 0.6, 0.15]} position={[-0.3, 0.3, 0]}>
        <meshStandardMaterial color="#000080" />
      </Box>
      <Box args={[0.15, 0.6, 0.15]} position={[0.3, 0.3, 0]}>
        <meshStandardMaterial color="#000080" />
      </Box>

      <Box args={[0.15, 0.8, 0.15]} position={[-0.25, 1.2, 0]}>
        <meshStandardMaterial color={skinColor} />
      </Box>
      <Box args={[0.15, 0.8, 0.15]} position={[0.25, 1.2, 0]}>
        <meshStandardMaterial color={skinColor} />
      </Box>

      <Box args={[0.5, 0.05, 0.3]} position={[0.4, 1.2, 0]}>
        <meshStandardMaterial color="#654321" />
      </Box>

      {angerLevel > 0 && (
        <pointLight 
          position={[0, 2, 0]} 
          color="#FF0000" 
          intensity={angerLevel * 0.5} 
          distance={5} 
        />
      )}
    </group>
  );
};

export default Baldi;
