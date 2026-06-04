import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import Firearm from './Firearm'
import Knife from './Knife'
import BluntWeapon from './BluntWeapon'

export default function DroppedWeaponMarker({
  visible,
  position = [0.4, 0, 0.3],
  weaponType = 'FIREARM',
  label = 'WEAPON',
  isBat = false,
}) {
  const ringRef = useRef()
  const pulse = useRef(0.6)

  useFrame((_, delta) => {
    pulse.current = 0.4 + (Math.sin(Date.now() * 0.005) + 1) * 0.3
    if (ringRef.current?.material) ringRef.current.material.opacity = pulse.current
  })

  if (!visible) return null

  let weapon = null
  if (weaponType === 'FIREARM') weapon = <Firearm dropped />
  else if (weaponType === 'KNIFE') weapon = <Knife dropped />
  else if (weaponType === 'BLUNT') weapon = <BluntWeapon dropped isBat={isBat} />

  return (
    <group position={position}>
      {weapon}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshBasicMaterial color="#FF4444" transparent opacity={0.6} />
      </mesh>
      <Html position={[0, 0.6, 0]} center distanceFactor={6}>
        <div
          style={{
            background: 'rgba(255,50,50,0.95)',
            color: '#FFFFFF',
            fontFamily: 'Courier New, monospace',
            fontWeight: 'bold',
            fontSize: '12px',
            padding: '4px 10px',
            borderRadius: '3px',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 16px rgba(255,50,50,0.8)',
            border: '1px solid rgba(255,255,255,0.4)',
          }}
        >
          ⚠ E-01 · {label}
        </div>
      </Html>
    </group>
  )
}
