import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Firearm({ muzzleFlash = false, dropped = false }) {
  const lightRef = useRef()
  const flashFrames = useRef(0)

  useFrame(() => {
    if (!lightRef.current) return
    if (muzzleFlash && flashFrames.current < 3) {
      lightRef.current.intensity = 15
      flashFrames.current += 1
    } else {
      lightRef.current.intensity = 0
      if (!muzzleFlash) flashFrames.current = 0
    }
  })

  return (
    <group rotation={dropped ? [0, 0, Math.PI / 2] : [-Math.PI / 2, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.013, 0.016, 0.22, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.012, 0]}>
        <boxGeometry args={[0.034, 0.044, 0.21]} />
        <meshStandardMaterial color="#222222" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0.018, 0.018, -0.02]}>
        <boxGeometry args={[0.005, 0.018, 0.06]} />
        <meshStandardMaterial color="#111" metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.038, 0.1]}>
        <boxGeometry args={[0.006, 0.01, 0.008]} />
        <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.038, -0.09]}>
        <boxGeometry args={[0.018, 0.01, 0.008]} />
        <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.012, 0.04]}>
        <boxGeometry args={[0.032, 0.022, 0.13]} />
        <meshStandardMaterial color="#1E1E1E" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.065, -0.065]} rotation={[-0.28, 0, 0]}>
        <boxGeometry args={[0.028, 0.115, 0.045]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.03, 0.008]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.005, 0.022, 0.008]} />
        <meshStandardMaterial color="#444" metalness={0.7} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0, 0.12]} intensity={0} color="#FFAA00" distance={2} />
    </group>
  )
}
