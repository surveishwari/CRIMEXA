import { useRef } from 'react'

const WALL = '#D4C5A9'
const FLOOR = '#8B7355'

export default function IndoorHouseEnv({ doorRef, victimWasSleeping = false, isApartment = false }) {
  const size = isApartment ? 8 : 10
  const half = size / 2
  const wallH = 3

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={FLOOR} roughness={0.85} />
      </mesh>

      <mesh position={[0, wallH / 2, -half]} castShadow receiveShadow>
        <boxGeometry args={[size, wallH, 0.12]} />
        <meshStandardMaterial color={WALL} roughness={0.9} />
      </mesh>
      <mesh position={[-half, wallH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, wallH, size]} />
        <meshStandardMaterial color={WALL} roughness={0.9} />
      </mesh>
      <mesh position={[half, wallH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, wallH, size]} />
        <meshStandardMaterial color={WALL} roughness={0.9} />
      </mesh>
      <mesh position={[0, wallH / 2, half]} castShadow receiveShadow>
        <boxGeometry args={[size, wallH, 0.12]} />
        <meshStandardMaterial color={WALL} roughness={0.9} />
      </mesh>

      <mesh position={[0, wallH, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color="#E8E0D0" roughness={0.95} />
      </mesh>

      {/* Window */}
      <mesh position={[2, 2, -half + 0.04]} castShadow>
        <boxGeometry args={[1.8, 1.5, 0.08]} />
        <meshStandardMaterial color="#F5F0E8" />
      </mesh>
      <mesh position={[2, 2, -half + 0.05]}>
        <boxGeometry args={[1.6, 1.3, 0.04]} />
        <meshStandardMaterial color="#88AACC" transparent opacity={0.25} metalness={0.1} />
      </mesh>
      <mesh position={[1.15, 2, -half + 0.06]}>
        <boxGeometry args={[0.5, 1.5, 0.04]} />
        <meshStandardMaterial color="#C8B49A" roughness={0.95} />
      </mesh>
      <mesh position={[2.85, 2, -half + 0.06]}>
        <boxGeometry args={[0.5, 1.5, 0.04]} />
        <meshStandardMaterial color="#C8B49A" roughness={0.95} />
      </mesh>

      {/* Door */}
      <mesh position={[-half + 0.04, 1.1, 1.5]}>
        <boxGeometry args={[0.1, 2.2, 1.1]} />
        <meshStandardMaterial color="#A0855A" />
      </mesh>
      <group ref={doorRef} position={[-half + 0.07, 1, 1.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 2, 0.95]} />
          <meshStandardMaterial color="#8B6914" roughness={0.7} />
        </mesh>
        <mesh position={[0.05, 0.1, -0.2]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#C0A000" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Sofa */}
      <mesh position={[-1, 0.225, -half + 1.2]} castShadow>
        <boxGeometry args={[2.2, 0.45, 0.9]} />
        <meshStandardMaterial color="#5C4A3A" roughness={0.85} />
      </mesh>
      <mesh position={[-1, 0.7, -half + 0.8]} castShadow>
        <boxGeometry args={[2.2, 0.55, 0.2]} />
        <meshStandardMaterial color="#5C4A3A" />
      </mesh>
      <mesh position={[-2.2, 0.3, -half + 1.2]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.9]} />
        <meshStandardMaterial color="#5C4A3A" />
      </mesh>
      <mesh position={[0.2, 0.3, -half + 1.2]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.9]} />
        <meshStandardMaterial color="#5C4A3A" />
      </mesh>

      {/* Coffee table */}
      <mesh position={[-1, 0.42, -half + 2.2]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.6]} />
        <meshStandardMaterial color="#6B4F35" roughness={0.6} />
      </mesh>
      {[
        [-0.5, 0.2, -0.25],
        [0.5, 0.2, -0.25],
        [-0.5, 0.2, 0.25],
        [0.5, 0.2, 0.25],
      ].map((p, i) => (
        <mesh key={i} position={[-1 + p[0], p[1], -half + 2.2 + p[2]]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#4A3520" />
        </mesh>
      ))}

      {victimWasSleeping && (
        <group position={[2.5, 0, -half + 1.5]}>
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[1.4, 0.3, 2]} />
            <meshStandardMaterial color="#E8E0D0" />
          </mesh>
          <mesh position={[0, 0.5, -0.5]} castShadow>
            <boxGeometry args={[1.4, 0.6, 0.1]} />
            <meshStandardMaterial color="#5C3D1E" />
          </mesh>
          <mesh position={[0, 0.32, -0.1]} castShadow>
            <boxGeometry args={[0.5, 0.1, 0.4]} />
            <meshStandardMaterial color="#F0EDE8" />
          </mesh>
          <mesh position={[0, 0.31, 0.4]} castShadow>
            <boxGeometry args={[1.3, 0.08, 1]} />
            <meshStandardMaterial color="#8A6A5A" />
          </mesh>
        </group>
      )}

      <mesh position={[0, 2.94, 0]}>
        <boxGeometry args={[0.8, 0.06, 0.3]} />
        <meshStandardMaterial color="#EEEEEE" />
      </mesh>
      <mesh position={[0, 2.91, 0]}>
        <boxGeometry args={[0.7, 0.01, 0.25]} />
        <meshStandardMaterial emissive="#FFFDE7" emissiveIntensity={4} color="#FFFDE7" />
      </mesh>
      <pointLight position={[0, 2.8, 0]} intensity={2.5} color="#FFF8E1" distance={8} decay={2} castShadow />
    </group>
  )
}
