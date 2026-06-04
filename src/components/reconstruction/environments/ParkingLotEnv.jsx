import * as THREE from 'three'

export default function ParkingLotEnv({ isNight = true }) {
  return (
    <group>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[28, 24, 24]} />
        <meshBasicMaterial color={isNight ? '#0a1028' : '#87CEEB'} side={THREE.BackSide} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 20]} />
        <meshStandardMaterial color="#333333" roughness={0.9} />
      </mesh>

      {[-6, 0, 6].map((z, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]}>
          <planeGeometry args={[20, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      {[-5, 4].map((x, i) => (
        <group key={i} position={[x, 0.35, -2]}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.6, 3.8]} />
            <meshStandardMaterial color={i ? '#334455' : '#223344'} />
          </mesh>
        </group>
      ))}

      <mesh position={[9, 4, -8]}>
        <cylinderGeometry args={[0.08, 0.12, 8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <pointLight position={[9, 7.5, -8]} intensity={3} color="#ffffcc" distance={15} />

      <mesh position={[0, 2, -10]}>
        <planeGeometry args={[40, 4]} />
        <meshBasicMaterial color="#556677" wireframe />
      </mesh>
    </group>
  )
}
