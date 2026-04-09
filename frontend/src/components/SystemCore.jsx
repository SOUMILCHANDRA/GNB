import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Orb({ isReversing, balance }) {
  const meshRef = useRef();
  const materialRef = useRef();

  // Normalize balance for visual mapping (0 to 1M range)
  const balanceFactor = Math.min(Math.max(balance / 1000000, 0), 1);

  useFrame((state) => {
    const { clock } = state;
    const speed = (isReversing ? -0.8 : 0.2) * (1 + balanceFactor * 2);
    
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 1.5;
    }
    
    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        isReversing ? 0.8 : 0.2 + balanceFactor * 0.4,
        0.05
      );
      materialRef.current.speed = isReversing ? 10 : 3 * (1 + balanceFactor);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        (isReversing ? 12 : 2 + balanceFactor * 6),
        0.05
      );
    }
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={3}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          ref={materialRef}
          color={isReversing ? "#ff007a" : "#00e5ff"}
          speed={4}
          distort={0.5}
          radius={1.5}
          emissive={isReversing ? "#ff007a" : "#00e5ff"}
          emissiveIntensity={4}
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>
      
      {/* Inner Glow Core */}
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial
          color={isReversing ? "#ff007a" : "#00e5ff"}
          emissive={isReversing ? "#ff007a" : "#00e5ff"}
          emissiveIntensity={10 * (1 + balanceFactor)}
          transparent
          opacity={0.9}
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

export default function SystemCore({ isReversing, balance }) {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none opacity-100">
      <Canvas style={{ height: '100%', width: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color={isReversing ? "#ff007a" : "#00e5ff"} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
        
        <Orb isReversing={isReversing} balance={balance} />
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
