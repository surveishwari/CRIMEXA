export default function AlleyEnv() {
  const brickRows = []
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 4; col++) {
      brickRows.push({
        side: -1,
        y: row * 0.3 + 0.15,
        z: col * 0.4 - 3.5 + (row % 2) * 0.2,
        color: (row + col) % 2 === 0 ? '#7A3B1E' : '#6A2E14',
      })
      brickRows.push({
        side: 1,
        y: row * 0.3 + 0.15,
        z: col * 0.4 - 3.5 + ((row + 1) % 2) * 0.2,
        color: (row + col + 1) % 2 === 0 ? '#7A3B1E' : '#6A2E14',
      })
    }
  }

  return (
    <group>
      <fogExp2 attach="fog" args={['#08080E', 0.06]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 20]} />
        <meshStandardMaterial color="#252520" roughness={0.95} metalness={0.08} />
      </mesh>

      <mesh position={[-2.5, 3, 0]} castShadow>
        <boxGeometry args={[0.2, 6, 20]} />
        <meshStandardMaterial color="#7A3B1E" roughness={0.95} />
      </mesh>
      <mesh position={[2.5, 3, 0]} castShadow>
        <boxGeometry args={[0.2, 6, 20]} />
        <meshStandardMaterial color="#7A3B1E" roughness={0.95} />
      </mesh>

      {brickRows.map((b, i) => (
        <mesh
          key={i}
          position={[b.side * 2.38, b.y, b.z]}
          castShadow
        >
          <boxGeometry args={[0.22, 0.12, 0.38]} />
          <meshStandardMaterial color={b.color} />
        </mesh>
      ))}

      <group position={[1.5, 0, -7]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.2, 1, 0.8]} />
          <meshStandardMaterial color="#2D5A27" roughness={0.8} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.04, 0]} rotation={[-0.3, 0, 0]} castShadow>
          <boxGeometry args={[1.25, 0.08, 0.85]} />
          <meshStandardMaterial color="#265022" />
        </mesh>
        <mesh position={[-0.45, 0.1, 0.35]}>
          <cylinderGeometry args={[0.1, 0.1, 0.15]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0.45, 0.1, 0.35]}>
          <cylinderGeometry args={[0.1, 0.1, 0.15]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      <mesh position={[-2.38, 1.5, 1.5]}>
        <boxGeometry args={[0.02, 0.5, 0.8]} />
        <meshStandardMaterial color="#CC2200" emissive="#880000" emissiveIntensity={0.2} />
      </mesh>

      <mesh position={[-1.5, 5, 8]}>
        <cylinderGeometry args={[0.04, 0.06, 5, 8]} />
        <meshStandardMaterial color="#444" metalness={0.6} />
      </mesh>
      <pointLight position={[-1.5, 4, 7]} intensity={3} color="#FF9940" distance={10} decay={2} castShadow />
      <spotLight
        position={[-2, 5, 7]}
        angle={0.6}
        penumbra={0.4}
        intensity={2}
        color="#FF9940"
        castShadow
      />
    </group>
  )
}
