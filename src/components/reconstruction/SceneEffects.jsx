import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function BulletTrajectory({ visible }) {
  const dotRef = useRef()
  const progress = useRef(0)

  const { lineGeo, points } = useMemo(() => {
    const pts = [
      new THREE.Vector3(-0.5, 1.2, 0.8),
      new THREE.Vector3(0.5, 1.1, -0.3),
    ]
    return {
      lineGeo: new THREE.BufferGeometry().setFromPoints(pts),
      points: pts,
    }
  }, [])

  useFrame((_, delta) => {
    if (!visible || !dotRef.current) return
    progress.current = (progress.current + delta * 0.8) % 1.01
    const t = Math.min(progress.current, 1)
    dotRef.current.position.lerpVectors(points[0], points[1], t)
  })

  if (!visible) return null

  return (
    <group>
      <line geometry={lineGeo}>
        <lineBasicMaterial color="#FF4400" linewidth={2} transparent opacity={0.9} />
      </line>
      <mesh ref={dotRef} position={points[0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#FF6600" />
      </mesh>
    </group>
  )
}

const EVIDENCE_RING_POSITIONS = [
  [0.5, 0.05, 1],
  [-0.3, 0.05, 0.5],
  [0, 0.05, 1.2],
]

export function EvidencePulseRings({ visible }) {
  const rings = useRef([])

  useFrame(({ clock }) => {
    if (!visible) return
    const pulse = Math.sin(clock.elapsedTime * 3) * 0.3 + 0.7
    rings.current.forEach((ring) => {
      if (ring?.material) ring.material.opacity = pulse * 0.75
    })
  })

  if (!visible) return null

  return (
    <group>
      {EVIDENCE_RING_POSITIONS.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            rings.current[i] = el
          }}
          position={pos}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.35, 0.02, 8, 32]} />
          <meshStandardMaterial
            color="#FFD700"
            transparent
            opacity={0.7}
            emissive="#FFD700"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}
