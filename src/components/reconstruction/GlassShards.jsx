import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GlassShards({ active, position = [4, 1.5, -3.5] }) {
  const groupRef = useRef()

  useEffect(() => {
    if (!active || !groupRef.current) return
    const shards = []
    groupRef.current.children.forEach((c) => shards.push(c))
    shards.forEach((shard, i) => {
      gsap.fromTo(
        shard.position,
        { x: 0, y: 0, z: 0 },
        {
          x: (Math.random() - 0.5) * 2.5,
          y: Math.random() * 1.5,
          z: (Math.random() - 0.5) * 2,
          duration: 0.6 + Math.random() * 0.4,
          delay: i * 0.02,
          ease: 'power2.out',
        }
      )
      gsap.to(shard.material, {
        opacity: 0,
        duration: 2,
        delay: 1,
      })
    })
  }, [active])

  if (!active) return null

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[(i % 4) * 0.08 - 0.12, (i % 3) * 0.05, (i % 2) * 0.06]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        >
          <boxGeometry args={[0.06, 0.02, 0.04]} />
          <meshStandardMaterial color="#cceeff" transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}
