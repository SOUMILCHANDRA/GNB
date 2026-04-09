import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Projector, Sphere, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Orb() {
  const meshRef = useRef();

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00e5ff"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#00e5ff"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
          wireframe
        />
      </Sphere>
      
      {/* Inner Glow Core */}
      <Sphere args={[0.6, 32, 32]}>
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={5}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField({ count = 200 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00e5ff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function SystemCore() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00e5ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
        
        <Orb />
        <ParticleField count={400} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Post-processing-like glow */}
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial 
            color="#000000" 
            transparent 
            opacity={0.1}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
