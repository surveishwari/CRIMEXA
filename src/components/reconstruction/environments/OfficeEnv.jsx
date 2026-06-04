export default function OfficeEnv() {
  const desks = [
    [-3, -2],
    [0, -2],
    [3, -2],
  ]

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#6B7280" roughness={0.98} />
      </mesh>

      {[
        [0, 1.5, -5],
        [-6, 1.5, 0],
        [6, 1.5, 0],
        [0, 1.5, 5],
      ].map((p, i) => (
        <mesh key={i} position={p} castShadow receiveShadow>
          <boxGeometry args={i < 2 ? [12, 3, 0.12] : [0.12, 3, 10]} />
          <meshStandardMaterial color="#E8E4DC" />
        </mesh>
      ))}

      <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#F0EDE8" />
      </mesh>

      {Array.from({ length: 40 }).map((_, i) => {
        const x = (i % 8) * 1.45 - 5
        const z = Math.floor(i / 8) * 1.2 - 4.5
        return (
          <mesh key={i} position={[x, 2.96, z]}>
            <boxGeometry args={[1.2, 0.04, 0.6]} />
            <meshStandardMaterial color="#F0EDE8" />
          </mesh>
        )
      })}

      {[-2, 0, 2].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 2.92, 0]}>
            <boxGeometry args={[2.5, 0.05, 0.15]} />
            <meshStandardMaterial emissive="#F8F8F0" emissiveIntensity={3} color="#F8F8F0" />
          </mesh>
          <pointLight position={[x, 2.5, 0]} intensity={1.5} color="#F5F5E8" distance={6} />
        </group>
      ))}

      {desks.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.38, 0]} castShadow>
            <boxGeometry args={[1.4, 0.05, 0.8]} />
            <meshStandardMaterial color="#666" />
          </mesh>
          {[
            [-0.55, 0.18, -0.3],
            [0.55, 0.18, -0.3],
            [-0.55, 0.18, 0.3],
            [0.55, 0.18, 0.3],
          ].map((lp, li) => (
            <mesh key={li} position={lp}>
              <cylinderGeometry args={[0.03, 0.03, 0.36]} />
              <meshStandardMaterial color="#444" />
            </mesh>
          ))}
          <mesh position={[0, 0.72, -0.2]} castShadow>
            <boxGeometry args={[0.05, 0.35, 0.3]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0, 0.72, -0.18]}>
            <boxGeometry args={[0.01, 0.3, 0.28]} />
            <meshStandardMaterial emissive="#001a33" emissiveIntensity={0.6} color="#001a33" />
          </mesh>
          <mesh position={[0, 0.4, 0.15]}>
            <boxGeometry args={[0.35, 0.02, 0.14]} />
            <meshStandardMaterial color="#888" />
          </mesh>
          <mesh position={[0, 0.22, 0.35]} castShadow>
            <cylinderGeometry args={[0.2, 0.22, 0.08, 12]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        </group>
      ))}

      {[-4, 0, 4].map((x, i) => (
        <group key={i} position={[x, 0, -4.8]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[0.5, 1, 0.4]} />
            <meshStandardMaterial color="#5A5A5A" metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.85, 0.22]}>
            <cylinderGeometry args={[0.02, 0.02, 0.08]} />
            <meshStandardMaterial color="#888" metalness={0.8} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.75, -1]}>
        <boxGeometry args={[3, 1.5, 0.05]} />
        <meshStandardMaterial color="#AACCDD" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}
