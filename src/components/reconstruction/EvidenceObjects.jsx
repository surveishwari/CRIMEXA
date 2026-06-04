import { forwardRef } from 'react'

const SPLATTERS = [
  [0.55, 0, 0.1, 0.06, 0.3],
  [-0.6, 0, 0.15, 0.05, 1.2],
  [0.2, 0, 0.65, 0.07, 2.1],
  [-0.3, 0, -0.55, 0.04, 0.8],
  [0.65, 0, -0.2, 0.05, 1.7],
  [-0.45, 0, 0.5, 0.06, 2.5],
  [0.1, 0, -0.6, 0.04, 0.5],
]

export function Firearm() {
  return (
    <group position={[0.5, 0.01, 1]} rotation={[0, 0.4, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.013, 0.015, 0.19, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.008, 0]}>
        <boxGeometry args={[0.028, 0.046, 0.195]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.045, -0.04]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.025, 0.1, 0.04]} />
        <meshStandardMaterial color="#222" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.025, 0.02]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.018, 0.004, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export function Laptop() {
  return (
    <group position={[-0.3, 0.01, 0.5]} rotation={[0, -0.6, 0.15]}>
      <mesh position={[0, 0.012, 0]}>
        <boxGeometry args={[0.32, 0.022, 0.22]} />
        <meshStandardMaterial color="#1C1C1C" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.023, 0.01]}>
        <boxGeometry args={[0.28, 0.002, 0.18]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      <group position={[0, 0.022, -0.1]} rotation={[-1.75, 0, 0]}>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.32, 0.022, 0.21]} />
          <meshStandardMaterial color="#1C1C1C" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.12, 0.008]}>
          <boxGeometry args={[0.28, 0.002, 0.18]} />
          <meshStandardMaterial
            color="#001830"
            emissive="#002244"
            emissiveIntensity={0.8}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  )
}

export const BloodPool = forwardRef(function BloodPool(_, ref) {
  return (
    <group ref={ref} position={[0, 0.002, 1.2]} scale={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 32]} />
        <meshStandardMaterial color="#4A0000" roughness={0.08} metalness={0.05} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.05, 0, 0.001]}>
        <circleGeometry args={[0.18, 24]} />
        <meshStandardMaterial
          color="#6B0000"
          roughness={0.02}
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
      {SPLATTERS.map(([x, y, z, r, rot], i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, rot]}
          position={[x, y, z]}
          scale={[1, 0.55, 1]}
        >
          <circleGeometry args={[r, 12]} />
          <meshStandardMaterial
            color="#3A0000"
            roughness={0.05}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
})

export default function EvidenceObjects({
  bloodRef,
  showBlood = false,
  showLaptop = true,
  showFirearm = true,
}) {
  return (
    <group>
      {showFirearm && <Firearm />}
      {showLaptop && <Laptop />}
      {showBlood && <BloodPool ref={bloodRef} />}
    </group>
  )
}
