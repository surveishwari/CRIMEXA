import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FirearmModel() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.06, 0.1, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.02, -0.12]}>
        <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
        <meshStandardMaterial color="#333" metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.05, 0.04]}>
        <boxGeometry args={[0.04, 0.08, 0.05]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  )
}

function KnifeModel() {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <boxGeometry args={[0.015, 0.22, 0.04]} />
        <meshStandardMaterial color="#aaa" metalness={0.95} roughness={0.08} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.08, 8]} />
        <meshStandardMaterial color="#3a2510" />
      </mesh>
    </group>
  )
}

function BluntModel({ isBat }) {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
      {isBat ? (
        <cylinderGeometry args={[0.04, 0.02, 0.7, 12]} />
      ) : (
        <cylinderGeometry args={[0.025, 0.025, 0.7, 10]} />
      )}
      <meshStandardMaterial color={isBat ? '#5c4033' : '#888'} roughness={0.85} />
    </mesh>
  )
}

function AcidBottle() {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.045, 0.12, 10]} />
        <meshStandardMaterial color="#88aa22" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}

function MuzzleFlash({ active, position }) {
  if (!active) return null
  return (
    <pointLight position={position} intensity={8} color="#ffffff" distance={3} decay={2} />
  )
}

export default function WeaponSystem({
  weaponType = 'NONE',
  suspectPosition = [0, 0, 0],
  visible = true,
  muzzleFlash = false,
  narrativeText = '',
}) {
  const groupRef = useRef()
  const [flash, setFlash] = useState(false)

  useFrame(() => {
    if (muzzleFlash && !flash) {
      setFlash(true)
      setTimeout(() => setFlash(false), 120)
    }
  })

  if (!visible || weaponType === 'NONE' || weaponType === 'HANDS') return null

  const pos = [
    suspectPosition[0] + 0.35,
    suspectPosition[1] + 1.05,
    suspectPosition[2] + 0.15,
  ]

  const isBat = (narrativeText || '').toLowerCase().includes('bat')

  let model = null
  let rot = [0, 0, 0]
  if (weaponType === 'FIREARM') {
    model = <FirearmModel />
    rot = [-0.15, 0, 0]
  } else if (weaponType === 'KNIFE') {
    model = <KnifeModel />
    rot = [0, -0.4, 0.3]
  } else if (weaponType === 'BLUNT') {
    model = <BluntModel isBat={isBat} />
    rot = [-1.2, 0, 0.2]
  } else if (weaponType === 'ACID') {
    model = <AcidBottle />
    rot = [-0.8, 0, 0]
  }

  return (
    <group ref={groupRef} position={pos} rotation={rot}>
      {model}
      {weaponType === 'FIREARM' && (
        <MuzzleFlash active={flash || muzzleFlash} position={[0, 0, -0.15]} />
      )}
    </group>
  )
}

export function DroppedWeapon({ weaponType, position, visible }) {
  if (!visible || !weaponType || weaponType === 'NONE' || weaponType === 'HANDS') return null
  return (
    <group position={position}>
      {weaponType === 'FIREARM' && <FirearmModel />}
      {weaponType === 'KNIFE' && <KnifeModel />}
      {weaponType === 'BLUNT' && <BluntModel />}
    </group>
  )
}
