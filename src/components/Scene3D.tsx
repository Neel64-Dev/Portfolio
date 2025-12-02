import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { FloatingObject } from './FloatingObject';

interface Scene3DProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

export const Scene3D = ({ mousePosition, scrollProgress }: Scene3DProps) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FFC04D" />

        <FloatingObject mousePosition={mousePosition} scrollProgress={scrollProgress} />

        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};
