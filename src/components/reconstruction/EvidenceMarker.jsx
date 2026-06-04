import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function EvidenceMarker({ pos, label, color, confidence = 90, visible = true }) {
  const ringRef = useRef()
  const [selected, setSelected] = useState(false)

  useFrame((_, delta) => {
    if (ringRef.current && visible) {
      ringRef.current.rotation.z += delta * 1.2
      const s = 1 + Math.sin(Date.now() * 0.004) * 0.08
      ringRef.current.scale.setScalar(s)
    }
  })

  if (!visible) return null

  return (
    <group position={pos} onClick={(e) => { e.stopPropagation(); setSelected((v) => !v) }}>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.03, 8, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.8]} />
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <Html position={[0, 0.95, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div
          style={{
            background: '#FFD700',
            color: '#000000',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            padding: '3px 8px',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 12px rgba(255,215,0,0.6)',
            borderRadius: '2px',
          }}
        >
          {label}
        </div>
      </Html>
      {selected && (
        <Html position={[0, 1.4, 0]} center distanceFactor={6}>
          <div
            style={{
              background: 'rgba(10,20,40,0.95)',
              border: '1px solid #00E5FF',
              color: '#ccc',
              fontFamily: 'Courier New',
              fontSize: '10px',
              padding: '8px',
              minWidth: '120px',
            }}
          >
            YOLOv8: {confidence}%<br />
            Tap to close
          </div>
        </Html>
      )}
    </group>
  )
}
