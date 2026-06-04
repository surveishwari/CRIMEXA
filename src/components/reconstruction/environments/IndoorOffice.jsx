import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function IndoorOffice({ drawerOpen = false }) {
  const drawerRef = useRef();

  useEffect(() => {
    if (!drawerRef.current) return;
    if (drawerOpen) {
      gsap.to(drawerRef.current.position, {
        z: 0.35,
        duration: 0.6,
        ease: "power2.out"
      });
    } else {
      gsap.to(drawerRef.current.position, {
        z: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    }
  }, [drawerOpen]);

  return (
    <group>
      {/* FLOOR - Office Tiles Style */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#B0BEC5" 
          roughness={0.5} 
          metalness={0.1}
        />
      </mesh>

      {/* WALLS */}
      {/* Back Wall */}
      <mesh position={[0, 2.5, -10]} receiveShadow castShadow>
        <boxGeometry args={[20, 5, 0.2]} />
        <meshStandardMaterial color="#CFD8DC" roughness={0.8} />
      </mesh>

      {/* Front Wall */}
      <mesh position={[0, 2.5, 10]} receiveShadow castShadow>
        <boxGeometry args={[20, 5, 0.2]} />
        <meshStandardMaterial color="#CFD8DC" roughness={0.8} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-10, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 5, 20]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.8} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[10, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 5, 20]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.8} />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 5, 0]} receiveShadow>
        <boxGeometry args={[20, 0.1, 20]} />
        <meshStandardMaterial color="#F5F7F8" roughness={0.9} />
      </mesh>

      {/* OFFICE DESKS (Double desk configuration in center/right) */}
      {/* Desk 1 (Right Center) */}
      <group position={[3, 0, 0]}>
        {/* Tabletop */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.04, 1.0]} />
          <meshStandardMaterial color="#ECEFF1" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Metal legs */}
        <mesh position={[-0.9, 0.375, -0.4]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.75]} />
          <meshStandardMaterial color="#90A4AE" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.9, 0.375, -0.4]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.75]} />
          <meshStandardMaterial color="#90A4AE" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.9, 0.375, 0.4]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.75]} />
          <meshStandardMaterial color="#90A4AE" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.9, 0.375, 0.4]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.75]} />
          <meshStandardMaterial color="#90A4AE" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Dual Monitor Setup */}
        <group position={[0, 0.77, -0.2]}>
          {/* Stand */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.2]} />
            <meshStandardMaterial color="#212121" metalness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.01]} />
            <meshStandardMaterial color="#212121" />
          </mesh>
          {/* Monitor Screen */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.65, 0.38, 0.03]} />
            <meshStandardMaterial color="#212121" roughness={0.7} />
          </mesh>
          {/* Glow Screen face */}
          <mesh position={[0, 0.25, 0.016]}>
            <planeGeometry args={[0.62, 0.35]} />
            <meshStandardMaterial color="#00E5FF" emissive="#00B0FF" emissiveIntensity={0.25} />
          </mesh>
        </group>

        {/* Chair */}
        <group position={[0, 0, 0.9]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
            <meshStandardMaterial color="#37474F" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.85, -0.2]} castShadow>
            <boxGeometry args={[0.48, 0.45, 0.05]} />
            <meshStandardMaterial color="#37474F" roughness={0.8} />
          </mesh>
          {/* Castors base */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.04, 5]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        </group>
      </group>

      {/* FILING CABINET (On the left side, where theft happens) */}
      <group position={[-5, 0, -4]}>
        {/* Main Cabinet frame */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 1.6, 0.7]} />
          <meshStandardMaterial color="#455A64" roughness={0.5} metalness={0.6} />
        </mesh>

        {/* Bottom Drawer (Static) */}
        <group position={[0, 0.35, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.64, 0.4, 0.02]} />
            <meshStandardMaterial color="#37474F" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.025]} castShadow>
            <boxGeometry args={[0.15, 0.03, 0.02]} />
            <meshStandardMaterial color="#CFD8DC" metalness={0.9} />
          </mesh>
        </group>

        {/* Middle Drawer (Static) */}
        <group position={[0, 0.8, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.64, 0.4, 0.02]} />
            <meshStandardMaterial color="#37474F" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.025]} castShadow>
            <boxGeometry args={[0.15, 0.03, 0.02]} />
            <meshStandardMaterial color="#CFD8DC" metalness={0.9} />
          </mesh>
        </group>

        {/* Top Drawer (ANIMATED) */}
        <group position={[0, 1.25, 0.01]} ref={drawerRef}>
          {/* Drawer Face */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.64, 0.4, 0.02]} />
            <meshStandardMaterial color="#37474F" roughness={0.4} />
          </mesh>
          {/* Handle */}
          <mesh position={[0, 0, 0.025]} castShadow>
            <boxGeometry args={[0.15, 0.03, 0.02]} />
            <meshStandardMaterial color="#CFD8DC" metalness={0.9} />
          </mesh>
          {/* Drawer Box (slides out) */}
          <mesh position={[0, -0.05, -0.3]} castShadow>
            <boxGeometry args={[0.58, 0.28, 0.58]} />
            <meshStandardMaterial color="#90A4AE" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* WINDOW (Far wall near z=-10) */}
      <group position={[0, 3.0, -9.9]}>
        <mesh castShadow>
          <boxGeometry args={[4.0, 2.0, 0.1]} />
          <meshStandardMaterial color="#37474F" roughness={0.5} />
        </mesh>
        {/* Window glass overlay */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.8, 1.8]} />
          <meshStandardMaterial color="#B3E5FC" transparent opacity={0.25} roughness={0.05} metalness={0.95} />
        </mesh>
      </group>

    </group>
  );
}
