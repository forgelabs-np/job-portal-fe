"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function GoldArtifact() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.45} floatIntensity={0.55}>
        <mesh castShadow rotation={[0.4, 0.65, 0.15]}>
          <torusKnotGeometry args={[0.5, 0.15, 160, 18]} />
          <meshStandardMaterial
            color="#14110c"
            metalness={0.96}
            roughness={0.22}
            emissive="#6b5420"
            emissiveIntensity={0.12}
          />
        </mesh>
      </Float>
      <Sparkles
        count={48}
        scale={4.2}
        size={2.8}
        speed={0.35}
        color="#d4af37"
        opacity={0.55}
        position={[0, 0.2, 0]}
      />
    </group>
  );
}

export default function LandingHero3DScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.15, 3.9], fov: 40 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.38} />
        <spotLight
          position={[4.5, 5.5, 6]}
          angle={0.32}
          penumbra={0.65}
          intensity={1.35}
          color="#fff4d6"
          castShadow
        />
        <pointLight position={[-4, -0.5, 2.5]} intensity={0.55} color="#4a7dff" />
        <GoldArtifact />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
