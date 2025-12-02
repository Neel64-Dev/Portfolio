import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingObjectProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

export const FloatingObject = ({ mousePosition, scrollProgress }: FloatingObjectProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;

    // Mouse parallax
    meshRef.current.rotation.x += (mousePosition.y * 0.1 - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (mousePosition.x * 0.1 - meshRef.current.rotation.y) * 0.05;

    // Floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;

    // Scale based on scroll
    const scale = 1 + scrollProgress * 0.5;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
      <MeshDistortMaterial
        color="#FFC04D"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};
