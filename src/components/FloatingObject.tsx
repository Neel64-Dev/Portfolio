import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingObjectProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

export const FloatingObject = ({ mousePosition, scrollProgress }: FloatingObjectProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useTexture(['/bulb.png', '/sports.png', '/laptop.png', '/sports.png']) as THREE.Texture[];

  const imagePositions: [number, number, number][] = [
    [1.5, 0.9, 0.1],
    [-1.3, 0.7, 0.2],
    [0.2, 1.4, -1.2],
    [0.9, -0.2, -1.1],
  ];

  const imageRotations: [number, number, number][] = [
    [0, -0.2, 0],
    [0, 0.28, 0],
    [0, 0.85, 0],
    [0, -0.35, 0],
  ];

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += 0.004;
    groupRef.current.rotation.x += 0.001;

    groupRef.current.rotation.x += (mousePosition.y * 0.08 - groupRef.current.rotation.x) * 0.06;
    groupRef.current.rotation.y += (mousePosition.x * 0.08 - groupRef.current.rotation.y) * 0.06;

    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.62) * 0.16;
    groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.08;

    const scale = 1.2 + scrollProgress * 0.18;
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {textures.map((texture, index) => (
        <mesh
          key={`image-${index}`}
          position={imagePositions[index]}
          rotation={imageRotations[index]}
        >
          <planeGeometry args={[1.1, 0.72]} />
          <meshStandardMaterial map={texture} toneMapped={false} />
        </mesh>
      ))}

      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.6, 0.76, 0.34, 36]} />
        <meshStandardMaterial color="#d39c23" metalness={1} roughness={0.18} />
      </mesh>

      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.24, 0.32, 0.9, 32]} />
        <meshStandardMaterial color="#f2c76a" metalness={1} roughness={0.14} />
      </mesh>

      <mesh position={[0, 1.5, 0]}> 
        <torusGeometry args={[0.56, 0.14, 26, 72]} />
        <meshStandardMaterial color="#f1c042" metalness={1} roughness={0.12} />
      </mesh>

      <mesh position={[0, 1.84, 0]}> 
        <boxGeometry args={[0.44, 0.22, 0.12]} />
        <meshStandardMaterial color="#ebb93b" metalness={1} roughness={0.1} />
      </mesh>

      <mesh position={[0, 2.14, 0]} rotation={[Math.PI / 4, 0, 0]}> 
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color="#f5d78d"
          metalness={1}
          roughness={0.08}
          emissive="#ffd988"
          emissiveIntensity={0.14}
        />
      </mesh>

      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}> 
        <torusGeometry args={[1.42, 0.09, 18, 64]} />
        <meshStandardMaterial color="#f1c35d" metalness={1} roughness={0.22} />
      </mesh>
    </group>
  );
};
