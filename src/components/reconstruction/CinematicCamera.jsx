import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

const ACT_CAMERAS = {
  MURDER: [
    { pos: [-3, 2.2, 5], target: [0, 1, 0], fov: 55 },
    { pos: [1.5, 1.6, 2.5], target: [0, 1.2, 0], fov: 45 },
    { pos: [0, 5.5, 1], target: [0, 0, 0.5], fov: 50 },
    { pos: [0.5, 0.4, 2.5], target: [0, 0.2, 0], fov: 40 },
    { pos: [3, 3, 5], target: [-2, 0.5, -1], fov: 60 },
  ],
  THEFT: [
    { pos: [0, 2, 6], target: [0, 1, 0], fov: 55 },
    { pos: [-2, 1.5, 3], target: [1, 1, -2], fov: 45 },
    { pos: [2, 2, 2], target: [0, 0.8, -1], fov: 50 },
    { pos: [0, 4, 0], target: [0, 0, 0], fov: 55 },
  ],
  BURGLARY: [
    { pos: [3, 2, 5], target: [-1, 1, 0], fov: 55 },
    { pos: [-1, 1.5, 3], target: [0, 1, 0], fov: 48 },
    { pos: [0, 2.5, 2], target: [-2, 0.8, -3], fov: 50 },
    { pos: [2, 4, 3], target: [0, 0, 0], fov: 60 },
  ],
  ASSAULT: [
    { pos: [0, 2, 6], target: [0, 1, 0], fov: 55 },
    { pos: [-2, 1.2, 2], target: [0, 1, 0], fov: 42 },
    { pos: [0, 5, 2], target: [0, 0, 0], fov: 50 },
  ],
  ARMED_ASSAULT: [
    { pos: [0, 2, 6], target: [0, 1, 0], fov: 55 },
    { pos: [-2, 1.2, 2], target: [0, 1, 0], fov: 42 },
    { pos: [0, 5, 2], target: [0, 0, 0], fov: 50 },
    { pos: [0.5, 0.4, 2.5], target: [0, 0.2, 0], fov: 40 },
  ],
}

export function cameraShake(camera, intensity = 0.08, duration = 0.6) {
  const startPos = camera.position.clone()
  let elapsed = 0
  const interval = setInterval(() => {
    elapsed += 0.016
    if (elapsed >= duration) {
      camera.position.copy(startPos)
      clearInterval(interval)
      return
    }
    const decay = 1 - elapsed / duration
    camera.position.x = startPos.x + (Math.random() - 0.5) * intensity * decay
    camera.position.y = startPos.y + (Math.random() - 0.5) * intensity * decay * 0.5
  }, 16)
}

export default function CinematicCamera({ currentAct, crimeType, isPlaying }) {
  const { camera } = useThree()
  const targetRef = useRef(new THREE.Vector3(0, 1.2, 0))

  useEffect(() => {
    if (!isPlaying) return
    const cameras = ACT_CAMERAS[crimeType] || ACT_CAMERAS.MURDER
    const cam = cameras[currentAct] || cameras[0]

    gsap.to(camera.position, {
      x: cam.pos[0],
      y: cam.pos[1],
      z: cam.pos[2],
      duration: 1.8,
      ease: 'power2.inOut',
    })
    gsap.to(targetRef.current, {
      x: cam.target[0],
      y: cam.target[1],
      z: cam.target[2],
      duration: 1.8,
      ease: 'power2.inOut',
    })
    gsap.to(camera, {
      fov: cam.fov,
      duration: 1.8,
      onUpdate: () => camera.updateProjectionMatrix(),
    })
  }, [currentAct, crimeType, isPlaying, camera])

  useFrame(() => {
    camera.lookAt(targetRef.current)
  })

  return null
}
