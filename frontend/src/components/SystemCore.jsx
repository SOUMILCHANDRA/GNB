import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
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

export default function SystemCore({ isReversing, balance, systemStatus, interactive = false }) {
  return (
    <div className={`fixed inset-0 transition-all duration-1000 ${interactive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-100'}`}>
      <Canvas style={{ height: '100%', width: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color={isReversing || systemStatus === 'CRITICAL' ? "#ff007a" : "#00e5ff"} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
        
        <ParticleField count={400} systemStatus={systemStatus} />
        
        {/* Only show stars in VOID mode */}
        {interactive && (
          <>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </>
        )}

        {/* Post-processing-like glow */}
        {!interactive && (
          <mesh position={[0, 0, -2]}>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial 
              color="#000000" 
              transparent 
              opacity={0.1}
            />
          </mesh>
        )}
      </Canvas>
    </div>
  );
}


