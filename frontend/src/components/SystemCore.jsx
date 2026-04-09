import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Orb({ isReversing, balance, systemStatus }) {
  const meshRef = useRef();
  const materialRef = useRef();

  // Normalize balance for visual mapping (0 to 1M range)
  const balanceFactor = Math.min(Math.max(balance / 1000000, 0), 1);
  const isActive = systemStatus === 'ACTIVE';
  const isCritical = systemStatus === 'CRITICAL';

  useFrame((state) => {
    const { clock } = state;
    const baseSpeed = isReversing ? -0.8 : 0.2;
    const activityMultiplier = isActive ? 3 : 1;
    const speed = baseSpeed * (1 + balanceFactor * 2) * activityMultiplier;
    
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 1.5;
    }
    
    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        isReversing || isCritical ? 0.8 : (isActive ? 0.6 : 0.2 + balanceFactor * 0.4),
        0.05
      );
      materialRef.current.speed = (isReversing ? 10 : 3 * (1 + balanceFactor)) * activityMultiplier;
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        (isReversing || isCritical ? 12 : 2 + balanceFactor * 6) * activityMultiplier,
        0.05
      );
    }
  });

  const coreColor = isReversing || isCritical ? "#ff007a" : "#00e5ff";

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={3}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          ref={materialRef}
          color={coreColor}
          speed={4}
          distort={0.5}
          radius={1.5}
          emissive={coreColor}
          emissiveIntensity={4}
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>
      
      {/* Inner Glow Core */}
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={10 * (1 + balanceFactor) * (isActive ? 2 : 1)}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField({ count = 200, systemStatus }) {
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
      const rotSpeed = systemStatus === 'ACTIVE' ? 0.005 : 0.001;
      pointsRef.current.rotation.y += rotSpeed;
      pointsRef.current.rotation.x += rotSpeed * 0.5;
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
        color={systemStatus === 'CRITICAL' ? "#ff007a" : "#00e5ff"}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function SystemCore({ isReversing, balance, systemStatus }) {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none opacity-100">
      <Canvas style={{ height: '100%', width: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color={isReversing || systemStatus === 'CRITICAL' ? "#ff007a" : "#00e5ff"} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
        
        <Orb isReversing={isReversing} balance={balance} systemStatus={systemStatus} />
        <ParticleField count={400} systemStatus={systemStatus} />
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
