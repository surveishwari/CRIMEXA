import * as THREE from 'three'

export default function StreetEnv({ isNight = true }) {
  const skyColor = isNight ? '#05050F' : '#87CEEB'

  const lampPositions = [
    [-7.5, 0, -6],
    [7.5, 0, 0],
    [-7.5, 0, 6],
  ]

  return (
    <group>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[30, 32, 32]} />
        <meshBasicMaterial color={skyColor} side={THREE.BackSide} />
      </mesh>

      <fogExp2 attach="fog" args={[skyColor, isNight ? 0.04 : 0.02]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 30]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>

      {[-8, -4, 0, 4, 8].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]}>
          <boxGeometry args={[0.15, 1.2, 0.01]} />
          <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.3} />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8.5, 0.01, 0]} receiveShadow>
        <planeGeometry args={[3, 30]} />
        <meshStandardMaterial color="#9B9B8A" roughness={0.92} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8.5, 0.01, 0]} receiveShadow>
        <planeGeometry args={[3, 30]} />
        <meshStandardMaterial color="#9B9B8A" roughness={0.92} />
      </mesh>

      <mesh position={[-7, 0.06, 0]} receiveShadow>
        <boxGeometry args={[0.2, 0.12, 30]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[7, 0.06, 0]} receiveShadow>
        <boxGeometry args={[0.2, 0.12, 30]} />
        <meshStandardMaterial color="#888888" />
      </mesh>

      {[-12, 12].map((x, side) => (
        <group key={side}>
          <mesh position={[x, 4, 0]} castShadow>
            <boxGeometry args={[0.2, 8, 30]} />
            <meshStandardMaterial color="#C8B89A" roughness={0.9} />
          </mesh>
          {Array.from({ length: 12 }).map((_, wi) => {
            const row = Math.floor(wi / 4)
            const col = wi % 4
            const lit = isNight && (wi + side) % 3 !== 0
            return (
              <mesh
                key={wi}
                position={[x + (side < 0 ? 0.11 : -0.11), 2 + row * 2, -9 + col * 6]}
              >
                <boxGeometry args={[0.05, 1.2, 1]} />
                <meshStandardMaterial
                  color={isNight ? '#1a1a2a' : '#88AACC'}
                  emissive={lit ? '#FFD580' : '#000000'}
                  emissiveIntensity={lit ? 1.2 : 0}
                  transparent={!isNight}
                  opacity={isNight ? 1 : 0.5}
                />
              </mesh>
            )
          })}
        </group>
      ))}

      {lampPositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 5, 8]} />
            <meshStandardMaterial color="#555555" metalness={0.7} />
          </mesh>
          <mesh position={[0.5, 4.8, 0]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[1.2, 0.05, 0.05]} />
            <meshStandardMaterial color="#555" metalness={0.7} />
          </mesh>
          <mesh position={[1, 4.75, 0]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial emissive="#FFE070" emissiveIntensity={3} color="#FFE070" />
          </mesh>
          <pointLight position={[1, 4.5, 0]} intensity={2.5} color="#FFD070" distance={8} decay={2} />
        </group>
      ))}

      <group position={[9, 0, 2]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[2, 0.55, 1]} />
          <meshStandardMaterial color="#1a3a5c" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.85, 0]} castShadow>
          <boxGeometry args={[1.3, 0.45, 0.95]} />
          <meshStandardMaterial color="#1a3a5c" />
        </mesh>
        <mesh position={[0, 0.82, 0.46]}>
          <boxGeometry args={[1.2, 0.4, 0.05]} />
          <meshStandardMaterial color="#88AACC" transparent opacity={0.3} />
        </mesh>
        {[
          [-0.75, 0.15, -0.45],
          [0.75, 0.15, -0.45],
          [-0.75, 0.15, 0.45],
          [0.75, 0.15, 0.45],
        ].map((p, wi) => (
          <mesh key={wi} position={p} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.18, 16]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        ))}
      </group>
    </group>
  )
}
