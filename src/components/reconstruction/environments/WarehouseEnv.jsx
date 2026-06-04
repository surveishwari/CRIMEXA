export default function WarehouseEnv() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
      </mesh>

      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>

      {[-8, 0, 8].map((x, i) => (
        <mesh key={i} position={[x, 3.9, 0]} castShadow>
          <boxGeometry args={[0.3, 0.4, 15]} />
          <meshStandardMaterial color="#555" metalness={0.6} />
        </mesh>
      ))}

      <mesh position={[0, 2, -7.4]} castShadow>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial color="#666" metalness={0.4} />
      </mesh>

      {[
        [-4, -2],
        [-4, 1],
        [2, -3],
        [3, 2],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.4, z]} castShadow>
          <boxGeometry args={[0.9, 0.8, 0.9]} />
          <meshStandardMaterial color="#8B6914" />
        </mesh>
      ))}

      <pointLight position={[-5, 6, 0]} intensity={1.2} color="#ffffee" distance={12} />
      <pointLight position={[5, 6, 3]} intensity={0.8} color="#ffffee" distance={10} />
    </group>
  )
}
