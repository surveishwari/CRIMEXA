export function FirearmModel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[0.08, 0.12, 0.22]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.02, -0.14]}>
        <cylinderGeometry args={[0.02, 0.02, 0.08]} />
        <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>
    </group>
  )
}

export function KnifeModel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[0.02, 0.02, 0.18]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.04, 0.06]}>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color="#3a2510" />
      </mesh>
    </group>
  )
}

export function BluntObjectModel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.35]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
    </group>
  )
}

export function WeaponProp({ weaponKey, visible, position }) {
  if (!visible || !weaponKey || weaponKey === 'None') return null
  const pos = position || [0.3, 0.9, 0.1]
  if (weaponKey === 'Firearm') return <FirearmModel position={pos} />
  if (weaponKey === 'Knife') return <KnifeModel position={pos} />
  if (weaponKey === 'Blunt Object') return <BluntObjectModel position={pos} />
  return null
}
