export default function BluntWeapon({ isBat = false, dropped = false }) {
  if (isBat) {
    return (
      <group rotation={dropped ? [0, 0, Math.PI / 2] : [-1.2, 0, 0.2]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.018, 0.02, 0.35, 10]} />
          <meshStandardMaterial color="#3D2200" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.08, 0.45, 0.04]} />
          <meshStandardMaterial color="#C8A055" roughness={0.7} />
        </mesh>
      </group>
    )
  }
  return (
    <group rotation={dropped ? [0, 0, Math.PI / 2] : [-1.2, 0, 0.2]}>
      <mesh>
        <cylinderGeometry args={[0.022, 0.025, 0.75, 12]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.375, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#444" metalness={0.9} />
      </mesh>
    </group>
  )
}
