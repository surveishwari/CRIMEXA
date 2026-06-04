import * as THREE from 'three'

export function GoldChain({ visible, position = [0, 1.35, 0] }) {
  if (!visible) return null
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.08, 0.008, 8, 24]} />
      <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} emissive="#aa8800" emissiveIntensity={0.2} />
    </mesh>
  )
}

export function StolenGoldInHand({ visible, suspectPos }) {
  if (!visible) return null
  return (
    <mesh position={[suspectPos[0] + 0.4, suspectPos[1] + 1, suspectPos[2] + 0.2]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.05, 0.006, 6, 16]} />
      <meshStandardMaterial color="#FFD700" metalness={0.95} />
    </mesh>
  )
}

export function CarModel({ position = [0, 0, -2], headlightsOn = false, moveOffset = 0 }) {
  return (
    <group position={[position[0], position[1], position[2] + moveOffset]}>
      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[2.2, 0.6, 1.1]} />
        <meshStandardMaterial color="#334455" metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[1.4, 0.5, 1]} />
        <meshStandardMaterial color="#445566" />
      </mesh>
      {[
        [-0.75, 0.15, -0.45],
        [0.75, 0.15, -0.45],
        [-0.75, 0.15, 0.45],
        [0.75, 0.15, 0.45],
      ].map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.22, 0.22, 0.12, 12]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}
      <mesh position={[0, 0.55, 0.51]}>
        <planeGeometry args={[1.2, 0.45]} />
        <meshStandardMaterial color="#88aacc" transparent opacity={0.35} />
      </mesh>
      {headlightsOn && (
        <>
          <mesh position={[-0.5, 0.4, 0.56]}>
            <boxGeometry args={[0.15, 0.08, 0.05]} />
            <meshStandardMaterial emissive="#ffffcc" emissiveIntensity={2} color="#ffffee" />
          </mesh>
          <mesh position={[0.5, 0.4, 0.56]}>
            <boxGeometry args={[0.15, 0.08, 0.05]} />
            <meshStandardMaterial emissive="#ffffcc" emissiveIntensity={2} color="#ffffee" />
          </mesh>
          <pointLight position={[0, 0.5, 1.5]} intensity={2} color="#ffffcc" distance={6} />
        </>
      )}
    </group>
  )
}

export function BloodWallSmear({ visible }) {
  if (!visible) return null
  return (
    <mesh position={[4.8, 1.2, -2]} rotation={[0, -Math.PI / 2, 0]}>
      <planeGeometry args={[0.8, 1.2]} />
      <meshStandardMaterial color="#8B0000" transparent opacity={0.7} side={THREE.DoubleSide} />
    </mesh>
  )
}

export function WoundMarker({ visible, position = [0.5, 1, 0.2] }) {
  if (!visible) return null
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#CC0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12]} />
        <meshStandardMaterial color="#aa0000" />
      </mesh>
    </group>
  )
}
