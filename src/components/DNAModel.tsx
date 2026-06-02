import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const DNAStrand = () => {
  const groupRef = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const angle = (i / 10) * Math.PI;
      const y = (i - 50) * 0.2;
      temp.push({ x: Math.cos(angle) * 3, y, z: Math.sin(angle) * 3 });
      temp.push({ x: Math.cos(angle + Math.PI) * 3, y, z: Math.sin(angle + Math.PI) * 3 });
    }
    return temp;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? '#0EA5E9' : '#A855F7'} 
            emissive={i % 2 === 0 ? '#0EA5E9' : '#A855F7'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      {Array.from({ length: 50 }).map((_, i) => {
        const p1 = points[i * 2];
        const p2 = points[i * 2 + 1];
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" opacity={0.5} transparent />
          </line>
        );
      })}
    </group>
  );
};

const DNAModel = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#0EA5E9" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#A855F7" intensity={1} />
        <DNAStrand />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default DNAModel;