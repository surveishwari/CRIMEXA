import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function CctvBlink() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.emissiveIntensity = Math.sin(state.clock.elapsedTime * 6) > 0 ? 2 : 0.1
  })
  return (
    <mesh ref={ref} position={[5.8, 3.1, -4.8]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial emissive="#ff0000" emissiveIntensity={1} color="#ff0000" />
    </mesh>
  )
}

export default function StoreEnv({ hasGold = false }) {
  const shelfColors = ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#E8E8E4" roughness={0.4} />
      </mesh>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`gx${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-7 + i, 0.015, 0]}>
          <boxGeometry args={[0.02, 12, 0.01]} />
          <meshStandardMaterial color="#CCCCCA" />
        </mesh>
      ))}

      <mesh position={[0, 0.9, 5.2]} castShadow>
        <boxGeometry args={[3, 1.8, 1]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh position={[0, 1.5, 5.35]}>
        <boxGeometry args={[0.4, 0.3, 0.2]} />
        <meshStandardMaterial emissive="#2244aa" emissiveIntensity={0.5} color="#111" />
      </mesh>

      {[-4, -1.5, 1, 3.5].map((x, si) => (
        <group key={si} position={[x, 0, -3]}>
          <mesh position={[0, 1.1, 0]} castShadow>
            <boxGeometry args={[0.1, 2.2, 0.9]} />
            <meshStandardMaterial color="#8B7355" />
          </mesh>
          {[0.5, 1.2, 1.9].map((sy, ri) => (
            <mesh key={ri} position={[0, sy, 0]}>
              <boxGeometry args={[0.85, 0.04, 0.85]} />
              <meshStandardMaterial color="#A08060" />
            </mesh>
          ))}
          {shelfColors.map((c, pi) => (
            <mesh key={pi} position={[0, 0.6 + pi * 0.35, 0.1]}>
              <boxGeometry args={[0.2 + (pi % 3) * 0.05, 0.15, 0.15]} />
              <meshStandardMaterial color={c} />
            </mesh>
          ))}
        </group>
      ))}

      {hasGold && (
        <group position={[2, 0.9, -2]}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 1, 0.8]} />
            <meshStandardMaterial color="#888" metalness={0.3} />
          </mesh>
          <mesh position={[0, 1.05, 0]}>
            <boxGeometry args={[1.1, 0.02, 0.7]} />
            <meshStandardMaterial color="#88AACC" transparent opacity={0.35} />
          </mesh>
          <mesh position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.04, 0.006, 8, 16]} />
            <meshStandardMaterial color="#FFD700" metalness={0.95} />
          </mesh>
        </group>
      )}

      <mesh position={[0, 1.5, 5.5]}>
        <boxGeometry args={[2, 2.2, 0.06]} />
        <meshStandardMaterial color="#999" transparent opacity={0.4} />
      </mesh>

      <group position={[5.5, 3, -4.5]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.08, 0.15]} />
          <meshStandardMaterial color="#222" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.12, 0.1, 0.15]} />
          <meshStandardMaterial color="#222" metalness={0.8} />
        </mesh>
        <CctvBlink />
      </group>
    </group>
  )
}
