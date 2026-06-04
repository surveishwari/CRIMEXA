import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function IndoorBedroom({ doorOpen = false }) {
  const doorRef = useRef();

  useEffect(() => {
    if (!doorRef.current) return;
    if (doorOpen) {
      gsap.to(doorRef.current.rotation, {
        y: -1.4,
        duration: 0.8,
        ease: "power2.out"
      });
    } else {
      gsap.to(doorRef.current.rotation, {
        y: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    }
  }, [doorOpen]);

  return (
    <group>
      {/* FLOOR - Hardwood Style */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#5C4033" 
          roughness={0.7} 
          metalness={0.15}
        />
      </mesh>

      {/* WALLS */}
      {/* Back Wall */}
      <mesh position={[0, 2.5, -10]} receiveShadow castShadow>
        <boxGeometry args={[20, 5, 0.2]} />
        <meshStandardMaterial color="#EAE5D9" roughness={0.9} />
      </mesh>

      {/* Front Wall */}
      <mesh position={[0, 2.5, 10]} receiveShadow castShadow>
        <boxGeometry args={[20, 5, 0.2]} />
        <meshStandardMaterial color="#EAE5D9" roughness={0.9} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-10, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 5, 20]} />
        <meshStandardMaterial color="#D7D3C6" roughness={0.9} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[10, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 5, 20]} />
        <meshStandardMaterial color="#D7D3C6" roughness={0.9} />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 5, 0]} receiveShadow>
        <boxGeometry args={[20, 0.1, 20]} />
        <meshStandardMaterial color="#F0EDE5" roughness={0.9} />
      </mesh>

      {/* SKIRTING BOARDS */}
      <mesh position={[0, 0.15, -9.85]}>
        <boxGeometry args={[20, 0.3, 0.1]} />
        <meshStandardMaterial color="#3E2723" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.15, 9.85]}>
        <boxGeometry args={[20, 0.3, 0.1]} />
        <meshStandardMaterial color="#3E2723" roughness={0.6} />
      </mesh>
      <mesh position={[-9.85, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.3, 20]} />
        <meshStandardMaterial color="#3E2723" roughness={0.6} />
      </mesh>
      <mesh position={[9.85, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.3, 20]} />
        <meshStandardMaterial color="#3E2723" roughness={0.6} />
      </mesh>

      {/* BED */}
      <group position={[-6, 0, -4]}>
        {/* Headboard */}
        <mesh position={[0, 0.75, -1.4]} castShadow>
          <boxGeometry args={[2.2, 1.5, 0.15]} />
          <meshStandardMaterial color="#2c1e18" roughness={0.5} />
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.6, 2.6]} />
          <meshStandardMaterial color="#ECEFF1" roughness={0.8} />
        </mesh>
        {/* Blanket/Comforter */}
        <mesh position={[0, 0.52, 0.3]} castShadow>
          <boxGeometry args={[2.02, 0.5, 2.0]} />
          <meshStandardMaterial color="#37474F" roughness={0.7} />
        </mesh>
        {/* Pillow 1 */}
        <mesh position={[-0.45, 0.78, -1.0]} castShadow>
          <boxGeometry args={[0.7, 0.12, 0.4]} />
          <meshStandardMaterial color="#ECEFF1" roughness={0.9} />
        </mesh>
        {/* Pillow 2 */}
        <mesh position={[0.45, 0.78, -1.0]} castShadow>
          <boxGeometry args={[0.7, 0.12, 0.4]} />
          <meshStandardMaterial color="#ECEFF1" roughness={0.9} />
        </mesh>
      </group>

      {/* NIGHTSTAND */}
      <group position={[-8.3, 0, -5.7]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.8, 0.6]} />
          <meshStandardMaterial color="#2c1e18" roughness={0.6} />
        </mesh>
        {/* Table Lamp */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 0.2, 8]} />
          <meshStandardMaterial color="#B0BEC5" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.15, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.22, 0.3, 12]} />
          <meshStandardMaterial color="#FFE082" roughness={0.9} emissive="#FFD54F" emissiveIntensity={0.2} />
        </mesh>
        {/* Lamp Light source */}
        <pointLight position={[0, 1.15, 0]} color="#FFB300" intensity={0.4} distance={4} decay={2} castShadow />
      </group>

      {/* ANIMATED DOOR (on the left wall near z=6) */}
      <group position={[-9.9, 0, 5]} ref={doorRef}>
        <group position={[0, 0, 0]}> {/* Pivot group */}
          <mesh position={[0, 1.25, 0.45]} castShadow>
            <boxGeometry args={[0.08, 2.5, 0.9]} />
            <meshStandardMaterial color="#5C4033" roughness={0.8} />
          </mesh>
          {/* Handle */}
          <mesh position={[0.06, 1.25, 0.8]} castShadow>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* WINDOW (cutout box style on right wall near z=0) */}
      <group position={[9.9, 2.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 1.8, 2.4]} />
          <meshStandardMaterial color="#37474F" roughness={0.4} />
        </mesh>
        {/* Window glass overlay */}
        <mesh position={[-0.01, 0, 0]}>
          <planeGeometry args={[2.3, 1.7]} />
          <meshStandardMaterial color="#B3E5FC" transparent opacity={0.3} roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Moonlight pointlight entering window */}
        <pointLight position={[-1, 0, 0]} color="#90CAF9" intensity={0.6} distance={10} decay={2} />
      </group>

      {/* DESK + CHAIR Setup */}
      <group position={[4, 0, -4]}>
        {/* Tabletop */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.05, 0.8]} />
          <meshStandardMaterial color="#4E342E" roughness={0.5} />
        </mesh>
        {/* Drawer Unit */}
        <mesh position={[-0.6, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.7, 0.7]} />
          <meshStandardMaterial color="#3E2723" roughness={0.6} />
        </mesh>
        {/* Desk legs */}
        <mesh position={[0.7, 0.375, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.02, 0.75]} />
          <meshStandardMaterial color="#212121" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.7, 0.375, 0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.02, 0.75]} />
          <meshStandardMaterial color="#212121" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Chair */}
        <group position={[0, 0, 0.85]} rotation={[0, Math.PI, 0]}>
          {/* Seat */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[0.55, 0.06, 0.55]} />
            <meshStandardMaterial color="#212121" roughness={0.8} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.85, -0.22]} castShadow>
            <boxGeometry args={[0.5, 0.4, 0.05]} />
            <meshStandardMaterial color="#212121" roughness={0.8} />
          </mesh>
          {/* Chair base post */}
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial color="#757575" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Wheels */}
          <mesh position={[0, 0.03, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.05, 5]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        </group>
      </group>

    </group>
  );
}
