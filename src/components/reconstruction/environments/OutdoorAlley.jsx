import React from 'react';
import * as THREE from 'three';

export default function OutdoorAlley() {
  return (
    <group>
      {/* ALLEY FOG - Volumetric Night feel */}
      <fogExp2 attach="fog" color="#0a0a12" density={0.08} />

      {/* GROUND - Wet, reflective concrete */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#15171c" 
          roughness={0.18} 
          metalness={0.8} // highly reflective for wet concrete look
        />
      </mesh>

      {/* BRICK WALLS (Left and Right forming a narrow alleyway) */}
      {/* Left Alley Wall */}
      <mesh position={[-4, 4, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.3, 8, 30]} />
        <meshStandardMaterial 
          color="#42221D" 
          roughness={0.9} 
        />
      </mesh>

      {/* Right Alley Wall */}
      <mesh position={[4, 4, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.3, 8, 30]} />
        <meshStandardMaterial 
          color="#42221D" 
          roughness={0.9} 
        />
      </mesh>

      {/* DUMPSTER (Green commercial waste bin on the left side) */}
      <group position={[-2.8, 0, -2]}>
        {/* Dumpster Body */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 1.0, 1.8]} />
          <meshStandardMaterial color="#1B3F2E" roughness={0.6} metalness={0.4} />
        </mesh>
        {/* Lid */}
        <mesh position={[0, 1.12, 0.0]} castShadow>
          <boxGeometry args={[1.16, 0.06, 1.86]} />
          <meshStandardMaterial color="#263238" roughness={0.8} />
        </mesh>
        {/* Dumpster wheels */}
        <mesh position={[-0.45, 0.06, -0.7]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0.45, 0.06, -0.7]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[-0.45, 0.06, 0.7]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0.45, 0.06, 0.7]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      {/* DISTANT STREETLIGHT (High post with PointLight) */}
      <group position={[3.2, 0, 4]}>
        {/* Vertical Post */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.09, 5.0, 8]} />
          <meshStandardMaterial color="#37474F" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Arm extension */}
        <mesh position={[-0.4, 5.0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
          <meshStandardMaterial color="#37474F" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Lamp head */}
        <mesh position={[-0.8, 4.9, 0]} castShadow>
          <boxGeometry args={[0.3, 0.15, 0.3]} />
          <meshStandardMaterial color="#212121" />
        </mesh>
        {/* Glow Light Bulb */}
        <mesh position={[-0.8, 4.8, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#FFF9C4" emissive="#FFEE58" emissiveIntensity={1} />
        </mesh>
        {/* Warm street lamp light source */}
        <pointLight 
          position={[-0.8, 4.7, 0]} 
          color="#FFF176" 
          intensity={1.8} 
          distance={15} 
          decay={1.8} 
          castShadow 
          shadow-bias={-0.001}
        />
      </group>

    </group>
  );
}
