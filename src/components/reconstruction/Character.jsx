import React, { useEffect, useState, Suspense, useRef, Component } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import HumanFigure from './HumanFigure'
import { isValidGlbUrl } from '../../utils/verifyGlb'

const MIXAMO_IDLE = '/models/idle.glb'

const ANIM_MAP = {
  idle: ['Idle', 'idle'],
  walk: ['Walk', 'Walking', 'walk'],
  run: ['Run', 'Running', 'run'],
  fall: ['Dying', 'Fall', 'Idle'],
  punch: ['Punch', 'Walk', 'Idle'],
  defeated: ['Defeated', 'Idle'],
  pickup: ['Pick Up', 'Walk', 'Idle'],
}

function findAction(actions, keys) {
  if (!actions) return null
  for (const key of keys) {
    if (actions[key]) return actions[key]
  }
  const names = Object.keys(actions)
  const hit = names.find((n) =>
    keys.some((k) => n.toLowerCase().includes(k.toLowerCase()))
  )
  return hit ? actions[hit] : null
}

function MannequinFigure({
  innerRef,
  position,
  rotation,
  currentAnim,
  isSuspect,
  shirtColor,
  currentWeapon,
  showWeaponInHand,
  muzzleFlash,
  narrativeText,
}) {
  return (
    <HumanFigure
      ref={innerRef}
      position={position}
      rotation={rotation}
      currentAnim={currentAnim}
      skinColor={isSuspect ? '#B8956E' : '#D4A574'}
      shirtColor={shirtColor || (isSuspect ? '#1a1a22' : '#2C3E50')}
      pantsColor={isSuspect ? '#0a0a0f' : '#1A1A2E'}
      isSuspect={isSuspect}
      currentWeapon={currentWeapon}
      showWeaponInHand={showWeaponInHand}
      muzzleFlash={muzzleFlash}
      narrativeText={narrativeText}
    />
  )
}

class MixamoErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(err) {
    console.warn('[Character] Mixamo load failed, using mannequin:', err?.message)
    useGLTF.clear(MIXAMO_IDLE)
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function MixamoCharacter({
  currentAnim = 'idle',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = null,
  innerRef,
}) {
  const group = useRef()
  const { scene, animations } = useGLTF(MIXAMO_IDLE)
  const cloneRef = useRef(null)

  if (!cloneRef.current && scene) {
    cloneRef.current = scene.clone(true)
    cloneRef.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }

  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (!cloneRef.current || !color) return
    cloneRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone()
        if (child.material.color) child.material.color.set(color)
      }
    })
  }, [color])

  useEffect(() => {
    const keys = ANIM_MAP[currentAnim] || ANIM_MAP.idle
    Object.values(actions || {}).forEach((a) => a?.fadeOut(0.25))
    const action = findAction(actions, keys)
    if (action) {
      action.reset().fadeIn(0.3).play()
      if (currentAnim === 'fall' || currentAnim === 'defeated') {
        action.setLoop(THREE.LoopOnce, 1)
        action.clampWhenFinished = true
      } else {
        action.setLoop(THREE.LoopRepeat, Infinity)
      }
    }
  }, [currentAnim, actions])

  useEffect(() => {
    if (innerRef) {
      innerRef.current = { group: group.current, actions }
    }
  }, [actions, innerRef])

  if (!cloneRef.current) return null

  return (
    <group ref={group} position={position} rotation={rotation} scale={0.01}>
      <primitive object={cloneRef.current} />
    </group>
  )
}

/**
 * Uses enhanced primitive mannequin until a real GLB exists at /public/models/idle.glb.
 */
export default function Character({
  currentAnim = 'idle',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = null,
  shirtColor = null,
  currentWeapon = null,
  showWeaponInHand = false,
  muzzleFlash = false,
  narrativeText = '',
  innerRef,
}) {
  const [useMixamo, setUseMixamo] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    isValidGlbUrl(MIXAMO_IDLE).then((valid) => {
      if (!cancelled) {
        setUseMixamo(valid)
        setReady(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const isSuspect = color != null
  const mannequin = (
    <MannequinFigure
      innerRef={innerRef}
      position={position}
      rotation={rotation}
      currentAnim={currentAnim}
      isSuspect={isSuspect}
      shirtColor={shirtColor || color}
      currentWeapon={currentWeapon}
      showWeaponInHand={showWeaponInHand}
      muzzleFlash={muzzleFlash}
      narrativeText={narrativeText}
    />
  )

  if (!ready) return null

  if (!useMixamo) return mannequin

  return (
    <MixamoErrorBoundary fallback={mannequin}>
      <Suspense fallback={mannequin}>
        <MixamoCharacter
          currentAnim={currentAnim}
          position={position}
          rotation={rotation}
          color={color}
          innerRef={innerRef}
        />
      </Suspense>
    </MixamoErrorBoundary>
  )
}
