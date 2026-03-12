import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DNAHelix() {
  const groupRef = useRef();
  const count = 30;
  const radius = 1.2;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const spheres = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const y = (i / count) * 6 - 3;
      items.push(
        { pos: [Math.cos(t) * radius, y, Math.sin(t) * radius], color: '#2563EB', strand: 1 },
        { pos: [Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius], color: '#22C55E', strand: 2 }
      );
      if (i % 3 === 0) {
        items.push({ line: true, from: [Math.cos(t) * radius, y, Math.sin(t) * radius], to: [Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius] });
      }
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {spheres.map((item, idx) => {
        if (item.line) {
          const points = [new THREE.Vector3(...item.from), new THREE.Vector3(...item.to)];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <line key={idx} geometry={geometry}>
              <lineBasicMaterial color="#94A3B8" transparent opacity={0.3} />
            </line>
          );
        }
        return (
          <mesh key={idx} position={item.pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

function FloatingOrb({ position, color, size = 1, speed = 1 }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });
  return (
    <Float speed={2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.15} transparent opacity={0.7} distort={0.3} speed={2} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#2563EB" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export function HeroDNA({ className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="#22C55E" />
        <pointLight position={[3, 3, 2]} intensity={0.5} color="#2563EB" />
        <DNAHelix />
        <FloatingOrb position={[-2.5, 1.5, -1]} color="#2563EB" size={0.4} speed={0.8} />
        <FloatingOrb position={[2.5, -1, -2]} color="#22C55E" size={0.3} speed={1.2} />
        <FloatingOrb position={[1.8, 2, -1.5]} color="#8B5CF6" size={0.25} speed={1} />
        <ParticleField />
      </Canvas>
    </div>
  );
}

function PulsingHeart() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.3, 128, 32, 2, 3]} />
        <MeshDistortMaterial color="#2563EB" emissive="#2563EB" emissiveIntensity={0.2} distort={0.15} speed={1.5} roughness={0.3} metalness={0.7} />
      </mesh>
    </Float>
  );
}

export function HealthOrb3D({ className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 5]} intensity={1} />
        <pointLight position={[-2, -2, 3]} color="#22C55E" intensity={0.6} />
        <pointLight position={[2, 2, 3]} color="#2563EB" intensity={0.6} />
        <PulsingHeart />
        <ParticleField />
      </Canvas>
    </div>
  );
}

function BodyScan() {
  const groupRef = useRef();
  const ringRefs = useRef([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        const offset = (state.clock.elapsedTime * 0.5 + i * 0.8) % 4 - 2;
        ring.position.y = offset;
        ring.material.opacity = 1 - Math.abs(offset) / 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Body capsule */}
      <mesh>
        <capsuleGeometry args={[0.5, 2, 16, 32]} />
        <meshStandardMaterial color="#2563EB" transparent opacity={0.15} wireframe />
      </mesh>
      <mesh>
        <capsuleGeometry args={[0.48, 1.98, 16, 32]} />
        <meshStandardMaterial color="#2563EB" transparent opacity={0.06} />
      </mesh>
      {/* Scan rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (ringRefs.current[i] = el)} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.02, 8, 64]} />
          <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={0.5} transparent />
        </mesh>
      ))}
      {/* Data points */}
      {[
        [0.6, 0.8, 0], [- 0.6, 0.3, 0], [0.5, -0.3, 0.3],
        [-0.4, -0.7, -0.2], [0.3, 0, -0.5]
      ].map((pos, i) => (
        <mesh key={`dp-${i}`} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export function BodyScanner3D({ className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 5]} intensity={0.8} />
        <pointLight position={[-2, 0, 3]} color="#22C55E" intensity={0.5} />
        <pointLight position={[2, 0, 3]} color="#2563EB" intensity={0.5} />
        <BodyScan />
      </Canvas>
    </div>
  );
}
