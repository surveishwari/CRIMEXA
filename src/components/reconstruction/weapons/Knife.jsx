export default function Knife({ dropped = false }) {
  const rot = dropped ? [Math.PI / 2, 0, 0] : [Math.PI, 0, 0]
  return (
    <group rotation={rot}>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.008, 0.22, 0.042]} />
        <meshStandardMaterial color="#C8C8C8" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, 0.14, 0.022]}>
        <boxGeometry args={[0.002, 0.22, 0.004]} />
        <meshStandardMaterial color="#E8E8E8" metalness={1} roughness={0.02} />
      </mesh>
      <mesh position={[0, 0.26, 0.008]}>
        <coneGeometry args={[0.012, 0.04, 4]} />
        <meshStandardMaterial color="#C8C8C8" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.01, 0.04, 0.044]} />
        <meshStandardMaterial color="#B0B0B0" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[0.012, 0.018, 0.1]} />
        <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.014, 0.018, 0.16, 12]} />
        <meshStandardMaterial color="#3D2200" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.19, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#777" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}
