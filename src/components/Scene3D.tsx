import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { FloatingObject } from './FloatingObject';

interface Scene3DProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

export const Scene3D = ({ mousePosition, scrollProgress }: Scene3DProps) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[8, 10, 6]} intensity={1.1} color="#ffd27a" />
        <pointLight position={[-6, -6, -4]} intensity={0.8} color="#ffb84d" />

        <FloatingObject mousePosition={mousePosition} scrollProgress={scrollProgress} />

        <ContactShadows position={[0, -1.7, 0]} opacity={0.7} scale={6} blur={2} far={4} />
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};
