import React from 'react';

const WeaponModel = ({ type, position }) => {
  if (type === 'gun') {
    return (
      <group position={position} rotation={[Math.PI / 2, 0, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 0.05, 0.3]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.05, 0.1]} castShadow>
          <boxGeometry args={[0.05, 0.15, 0.1]} />
          <meshStandardMaterial color="#222" metalness={0.8} />
        </mesh>
      </group>
    );
  }
  
  // Default to knife
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0.5]}>
      {/* Handle */}
      <mesh castShadow>
        <boxGeometry args={[0.04, 0.02, 0.15]} />
        <meshStandardMaterial color="#3a2515" />
      </mesh>
      {/* Blade */}
      <mesh position={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.03, 0.01, 0.2]} />
        <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

export default WeaponModel;
