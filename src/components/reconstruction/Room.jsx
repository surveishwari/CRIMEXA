import * as THREE from 'three'

const floorMat = new THREE.MeshStandardMaterial({
  color: '#6B5344',
  roughness: 0.82,
  metalness: 0.08,
})
const wallMat = new THREE.MeshStandardMaterial({
  color: '#C8BCA8',
  roughness: 0.88,
  metalness: 0.02,
})
const ceilingMat = new THREE.MeshStandardMaterial({
  color: '#E8E0D0',
  roughness: 0.95,
})
const woodMat = new THREE.MeshStandardMaterial({
  color: '#5C3D1E',
  roughness: 0.72,
  metalness: 0.06,
})
const darkMat = new THREE.MeshStandardMaterial({
  color: '#1A1A1A',
  roughness: 0.55,
  metalness: 0.35,
})
const glassMat = new THREE.MeshStandardMaterial({
  color: '#88AACC',
  roughness: 0.08,
  metalness: 0.15,
  transparent: true,
  opacity: 0.35,
})

export default function Room() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <primitive object={floorMat} attach="material" />
      </mesh>

      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[12, 5, 0.15]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 5, 0.15]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      <mesh position={[6, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 5, 0.15]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      <mesh position={[0, 2.5, 5]} receiveShadow>
        <boxGeometry args={[12, 5, 0.15]} />
        <meshStandardMaterial color="#C8BCA8" roughness={0.92} />
      </mesh>

      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[12, 10, 0.12]} />
        <primitive object={ceilingMat} attach="material" />
      </mesh>

      <group position={[0, 4.85, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.06, 0.4]} />
          <meshStandardMaterial color="#EEE" roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[1.1, 0.01, 0.35]} />
          <meshStandardMaterial
            emissive="#FFFDE7"
            emissiveIntensity={3}
            color="#FFFDE7"
            roughness={1}
          />
        </mesh>
        <pointLight
          position={[0, -0.1, 0]}
          intensity={2.5}
          color="#FFF8E1"
          distance={8}
          decay={2}
          castShadow
        />
      </group>

      <mesh position={[0, 0.06, -4.92]}>
        <boxGeometry args={[12, 0.12, 0.06]} />
        <primitive object={woodMat} attach="material" />
      </mesh>
      <mesh position={[-5.92, 0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.12, 0.06]} />
        <primitive object={woodMat} attach="material" />
      </mesh>

      <mesh position={[2, 2.8, -4.92]}>
        <boxGeometry args={[2, 1.8, 0.05]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      <mesh position={[2, 2.8, -4.91]}>
        <boxGeometry args={[2.1, 1.9, 0.04]} />
        <meshStandardMaterial color="#F5F0E8" roughness={0.8} />
      </mesh>

      <mesh position={[-5.92, 1.5, 2]}>
        <boxGeometry args={[0.08, 3, 1.4]} />
        <meshStandardMaterial color="#8B6914" roughness={0.7} />
      </mesh>
      <mesh position={[-5.86, 1.5, 1.4]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial color="#C0A000" metalness={0.9} roughness={0.1} />
      </mesh>

      <group position={[3, 0, -3.5]}>
        <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.06, 1]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        {[
          [-0.95, 0.4, -0.4],
          [0.95, 0.4, -0.4],
          [-0.95, 0.4, 0.4],
          [0.95, 0.4, 0.4],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.06, 0.8, 0.06]} />
            <primitive object={woodMat} attach="material" />
          </mesh>
        ))}
        <mesh position={[0.7, 0.4, 0]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.9]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        <mesh position={[1.01, 0.5, 0]}>
          <boxGeometry args={[0.01, 0.25, 0.4]} />
          <meshStandardMaterial color="#4A2C0A" roughness={0.6} />
        </mesh>
      </group>

      <group position={[2.5, 0, -2]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.55, 0.08, 0.55]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[0, 1.05, -0.24]} castShadow>
          <boxGeometry args={[0.5, 0.9, 0.06]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.5, 8]} />
          <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      <group position={[-2, 0, -4.5]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.9, 0.5]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0, 0.25, 0.3, 12]} />
          <meshStandardMaterial
            color="#E8D080"
            roughness={0.6}
            emissive="#FFD060"
            emissiveIntensity={0.5}
          />
        </mesh>
        <pointLight position={[0, 1.2, 0]} intensity={0.8} color="#FFD580" distance={3} decay={2} />
      </group>
    </group>
  )
}
