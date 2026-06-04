import React from 'react';

const RoomGenerator = ({ type }) => {
  if (type === 'bedroom') {
    return (
      <group>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#453225" roughness={0.8} />
        </mesh>
        {/* Walls */}
        <mesh position={[0, 2.5, -6]} receiveShadow castShadow>
          <boxGeometry args={[12, 5, 0.2]} />
          <meshStandardMaterial color="#d1cbbd" />
        </mesh>
        <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[12, 5, 0.2]} />
          <meshStandardMaterial color="#d1cbbd" />
        </mesh>
        
        {/* Bed */}
        <mesh position={[2, 0.5, -4]} castShadow receiveShadow>
          <boxGeometry args={[3, 1, 4]} />
          <meshStandardMaterial color="#fff" roughness={0.9} />
        </mesh>
      </group>
    );
  }

  if (type === 'street') {
    return (
      <group>
        {/* Road */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#222" roughness={0.9} />
        </mesh>
        {/* Footpath */}
        <mesh position={[0, 0.1, -4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 4]} />
          <meshStandardMaterial color="#555" roughness={0.8} />
        </mesh>
        {/* Parked Car */}
        <mesh position={[-3, 0.75, 2]} castShadow receiveShadow>
          <boxGeometry args={[2, 1.5, 4]} />
          <meshStandardMaterial color="#1a3b5c" metalness={0.6} roughness={0.2} />
        </mesh>
        {/* Street Light */}
        <group position={[4, 0, -3]}>
          <mesh castShadow><cylinderGeometry args={[0.1, 0.1, 5]} /><meshStandardMaterial color="#111" /></mesh>
          <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffd599" distance={15} castShadow />
        </group>
      </group>
    );
  }

  // Default Office
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#ccc" roughness={0.6} />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 2.5, -7.5]} receiveShadow castShadow>
        <boxGeometry args={[15, 5, 0.2]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[-7.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[15, 5, 0.2]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Desk */}
      <mesh position={[0, 0.75, -5]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      {/* Legs */}
      <mesh position={[-1.4, 0.375, -5]} castShadow><boxGeometry args={[0.1, 0.75, 1.4]} /><meshStandardMaterial color="#333" /></mesh>
      <mesh position={[1.4, 0.375, -5]} castShadow><boxGeometry args={[0.1, 0.75, 1.4]} /><meshStandardMaterial color="#333" /></mesh>
      
      {/* Computer */}
      <mesh position={[0, 1.1, -5.2]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial color="#222" metalness={0.8} />
      </mesh>
      
      {/* Chair */}
      <mesh position={[0, 0.5, -3.5]} castShadow>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 1, -3.2]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
};

export default RoomGenerator;
