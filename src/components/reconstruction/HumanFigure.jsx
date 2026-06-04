import { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Firearm from './weapons/Firearm'
import Knife from './weapons/Knife'
import BluntWeapon from './weapons/BluntWeapon'

function SkinMat({ color }) {
  return (
    <meshStandardMaterial color={color} roughness={0.68} metalness={0.04} />
  )
}

function ShirtMat({ color }) {
  return (
    <meshStandardMaterial color={color} roughness={0.78} metalness={0.06} />
  )
}

function PantsMat({ color }) {
  return (
    <meshStandardMaterial color={color} roughness={0.82} metalness={0.03} />
  )
}

function ShoeMat() {
  return (
    <meshStandardMaterial color="#1a1a1a" roughness={0.55} metalness={0.15} />
  )
}

function Head({ skinColor, hairColor, isSuspect, headRef, neckRef }) {
  return (
    <group ref={neckRef} position={[0, 0.3, 0]}>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.055, 0.09, 8, 8]} />
        <SkinMat color={skinColor} />
      </mesh>

      <group ref={headRef} position={[0, 0.2, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.14, 20, 20]} />
          <SkinMat color={skinColor} />
        </mesh>

        <mesh position={[0, -0.1, 0.035]} castShadow>
          <boxGeometry args={[0.11, 0.07, 0.11]} />
          <SkinMat color={skinColor} />
        </mesh>

        <mesh position={[0, 0.01, 0.132]} castShadow>
          <boxGeometry args={[0.028, 0.032, 0.038]} />
          <SkinMat color={skinColor} />
        </mesh>

        <mesh position={[-0.048, 0.045, 0.125]} castShadow>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh position={[0.048, 0.045, 0.125]} castShadow>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.35} metalness={0.1} />
        </mesh>

        {!isSuspect && (
          <mesh position={[0, 0.11, -0.01]} castShadow>
            <sphereGeometry
              args={[0.148, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.52]}
            />
            <meshStandardMaterial color={hairColor} roughness={0.88} metalness={0} />
          </mesh>
        )}

        {isSuspect && (
          <group position={[0, -0.06, -0.02]}>
            <mesh castShadow renderOrder={2}>
              <sphereGeometry
                args={[0.205, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.75]}
              />
              <meshStandardMaterial
                color="#0d0d12"
                roughness={0.92}
                metalness={0.05}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, -0.14, 0]} renderOrder={2}>
              <cylinderGeometry args={[0.12, 0.14, 0.24, 12]} />
              <meshStandardMaterial color="#111118" roughness={0.9} metalness={0.02} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  )
}

function Leg({ thighRef, shinRef, side, pantsColor }) {
  const x = side === 'left' ? -0.1 : 0.1
  return (
    <group ref={thighRef} position={[x, 0, 0]}>
      <mesh position={[0, -0.22, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.078, 0.34, 10, 14]} />
        <PantsMat color={pantsColor} />
      </mesh>
      <group ref={shinRef} position={[0, -0.47, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
          <capsuleGeometry args={[0.068, 0.3, 10, 14]} />
          <PantsMat color={pantsColor} />
        </mesh>
        <mesh position={[0, -0.43, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.13, 0.045, 0.28]} />
          <ShoeMat />
        </mesh>
        <mesh position={[0, -0.395, 0.12]} castShadow>
          <boxGeometry args={[0.11, 0.025, 0.08]} />
          <ShoeMat />
        </mesh>
      </group>
    </group>
  )
}

const HumanFigure = forwardRef(function HumanFigure(
  {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    skinColor = '#D4A574',
    shirtColor = '#1a2a4a',
    pantsColor = '#1a1a2e',
    isSuspect = false,
    currentAnim = 'idle',
    currentWeapon = null,
    showWeaponInHand = false,
    muzzleFlash = false,
    narrativeText = '',
  },
  ref
) {
  const weaponGroupRef = useRef()
  const isBat = (narrativeText || '').toLowerCase().includes('bat')
  const rootRef = useRef()
  const torsoRef = useRef()
  const headRef = useRef()
  const neckRef = useRef()
  const lUpperArmRef = useRef()
  const lForearmRef = useRef()
  const rUpperArmRef = useRef()
  const rForearmRef = useRef()
  const pelvisRef = useRef()
  const lThighRef = useRef()
  const lShinRef = useRef()
  const rThighRef = useRef()
  const rShinRef = useRef()

  const hairColor = isSuspect ? '#1a1a1a' : '#3d2810'

  useImperativeHandle(ref, () => ({
    get root() {
      return rootRef.current
    },
    get torso() {
      return torsoRef.current
    },
    get head() {
      return headRef.current
    },
    get neck() {
      return neckRef.current
    },
    get lUpperArm() {
      return lUpperArmRef.current
    },
    get lForearm() {
      return lForearmRef.current
    },
    get rUpperArm() {
      return rUpperArmRef.current
    },
    get rForearm() {
      return rForearmRef.current
    },
    get lThigh() {
      return lThighRef.current
    },
    get lShin() {
      return lShinRef.current
    },
    get rThigh() {
      return rThighRef.current
    },
    get rShin() {
      return rShinRef.current
    },
    get pelvis() {
      return pelvisRef.current
    },
    get weaponGroup() {
      return weaponGroupRef.current
    },
  }))

  useFrame((state) => {
    if (!torsoRef.current) return
    const t = state.clock.elapsedTime

    const resetLimbs = () => {
      ;[lThighRef, rThighRef, lUpperArmRef, rUpperArmRef, lForearmRef, rForearmRef].forEach(
        (r) => {
          if (r.current) {
            r.current.rotation.x = THREE.MathUtils.lerp(r.current.rotation.x, 0, 0.12)
            r.current.rotation.z = THREE.MathUtils.lerp(r.current.rotation.z, 0, 0.12)
          }
        }
      )
    }

    if (currentAnim === 'idle') {
      const breath = 1 + Math.sin(t * 2.2) * 0.012
      torsoRef.current.scale.set(1, breath, 1)
      resetLimbs()
      return
    }

    torsoRef.current.scale.set(1, 1, 1)

    if (currentAnim === 'walk' || currentAnim === 'run' || currentAnim === 'pickup') {
      const speed = currentAnim === 'run' ? 9 : 5
      const amp = currentAnim === 'run' ? 0.75 : 0.55
      const phase = t * speed
      if (lThighRef.current) lThighRef.current.rotation.x = Math.sin(phase) * amp
      if (rThighRef.current) rThighRef.current.rotation.x = Math.sin(phase + Math.PI) * amp
      if (lUpperArmRef.current)
        lUpperArmRef.current.rotation.x = Math.sin(phase + Math.PI) * 0.35
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.x = Math.sin(phase) * 0.35
      return
    }

    if (currentAnim === 'punch') {
      if (rUpperArmRef.current) {
        rUpperArmRef.current.rotation.x = -1.1 + Math.sin(t * 6) * 0.12
      }
      if (rForearmRef.current) rForearmRef.current.rotation.x = -0.35
      return
    }

    if (currentAnim === 'raise_gun') {
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.x = -1.2
      if (rForearmRef.current) rForearmRef.current.rotation.x = -0.2
      if (lUpperArmRef.current) lUpperArmRef.current.rotation.x = -0.8
      if (lForearmRef.current) lForearmRef.current.rotation.x = -0.4
      if (torsoRef.current) {
        torsoRef.current.rotation.x = 0.08
        torsoRef.current.rotation.y = -0.15
      }
      return
    }

    if (currentAnim === 'stab') {
      if (rUpperArmRef.current)
        rUpperArmRef.current.rotation.x = -0.6 + Math.sin(t * 8) * 0.9
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.z = -0.3
      if (rForearmRef.current) rForearmRef.current.rotation.x = -1.4
      if (torsoRef.current) {
        torsoRef.current.rotation.x = 0.15
        torsoRef.current.rotation.y = Math.sin(t * 2) * 0.1
      }
      return
    }

    if (currentAnim === 'swing_blunt') {
      const swing = Math.sin(t * 4)
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.x = -1.4 + swing * 0.5
      if (rForearmRef.current) rForearmRef.current.rotation.x = -0.3
      if (lUpperArmRef.current) lUpperArmRef.current.rotation.x = -1.2
      if (torsoRef.current) torsoRef.current.rotation.x = -0.2
      return
    }

    if (currentAnim === 'strangle') {
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.x = -0.9
      if (lUpperArmRef.current) lUpperArmRef.current.rotation.x = -0.9
      if (rForearmRef.current) rForearmRef.current.rotation.z = 0.25
      if (lForearmRef.current) lForearmRef.current.rotation.z = -0.25
      if (torsoRef.current) torsoRef.current.rotation.x = 0.15
      return
    }

    if (currentAnim === 'strangle_victim') {
      if (lUpperArmRef.current) lUpperArmRef.current.rotation.x = -1.2 + Math.sin(t * 10) * 0.4
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.x = -1.2 + Math.sin(t * 10 + 1) * 0.4
      if (neckRef.current) neckRef.current.rotation.x = -0.25
      return
    }

    if (currentAnim === 'surrender') {
      if (lUpperArmRef.current) lUpperArmRef.current.rotation.x = -2.4
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.x = -2.4
      return
    }

    if (currentAnim === 'back_away') {
      if (lThighRef.current) lThighRef.current.rotation.x = -0.2
      if (rThighRef.current) rThighRef.current.rotation.x = 0.2
      if (lUpperArmRef.current) lUpperArmRef.current.rotation.x = -0.5
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.x = -0.5
      return
    }

    if (currentAnim === 'clutch') {
      if (lUpperArmRef.current) lUpperArmRef.current.rotation.x = -1.3
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.x = -1.3
      if (lForearmRef.current) lForearmRef.current.rotation.x = -0.8
      if (rForearmRef.current) rForearmRef.current.rotation.x = -0.8
      if (torsoRef.current) torsoRef.current.rotation.x = 0.2
      return
    }

    if (currentAnim === 'fall_forward') {
      if (torsoRef.current) torsoRef.current.rotation.x = 0.85
      if (pelvisRef.current) pelvisRef.current.rotation.x = 0.3
      return
    }

    if (currentAnim === 'fall_side') {
      if (torsoRef.current) torsoRef.current.rotation.z = 1.2
      if (pelvisRef.current) pelvisRef.current.rotation.z = 0.4
      return
    }

    if (currentAnim === 'grab') {
      if (rUpperArmRef.current) rUpperArmRef.current.rotation.x = -0.8 + Math.sin(t * 5) * 0.3
      if (rForearmRef.current) rForearmRef.current.rotation.x = -0.6
      return
    }

    if (currentAnim === 'lookout') {
      if (headRef.current) headRef.current.rotation.y = Math.sin(t * 0.8) * 0.6
      resetLimbs()
      return
    }

    resetLimbs()
  })

  return (
    <group ref={rootRef} position={position} rotation={rotation}>
      <group ref={pelvisRef} position={[0, 0.9, 0]}>
        <Leg
          side="left"
          thighRef={lThighRef}
          shinRef={lShinRef}
          pantsColor={pantsColor}
        />
        <Leg
          side="right"
          thighRef={rThighRef}
          shinRef={rShinRef}
          pantsColor={pantsColor}
        />
      </group>

      <group ref={torsoRef} position={[0, 1.15, 0]}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.19, 0.46, 10, 16]} />
          <ShirtMat color={shirtColor} />
        </mesh>

        <group position={[-0.23, 0.19, 0]}>
          <group ref={lUpperArmRef}>
            <mesh position={[0, -0.17, 0]} castShadow receiveShadow>
              <capsuleGeometry args={[0.062, 0.24, 10, 12]} />
              <ShirtMat color={shirtColor} />
            </mesh>
            <group ref={lForearmRef} position={[0, -0.36, 0]}>
              <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
                <capsuleGeometry args={[0.052, 0.21, 10, 12]} />
                <SkinMat color={skinColor} />
              </mesh>
              <mesh position={[0, -0.32, 0]} castShadow>
                <boxGeometry args={[0.085, 0.095, 0.05]} />
                <SkinMat color={skinColor} />
              </mesh>
            </group>
          </group>
        </group>

        <group position={[0.23, 0.19, 0]}>
          <group ref={rUpperArmRef}>
            <mesh position={[0, -0.17, 0]} castShadow receiveShadow>
              <capsuleGeometry args={[0.062, 0.24, 10, 12]} />
              <ShirtMat color={shirtColor} />
            </mesh>
            <group ref={rForearmRef} position={[0, -0.36, 0]}>
              <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
                <capsuleGeometry args={[0.052, 0.21, 10, 12]} />
                <SkinMat color={skinColor} />
              </mesh>
              <mesh position={[0, -0.32, 0]} castShadow>
                <boxGeometry args={[0.085, 0.095, 0.05]} />
                <SkinMat color={skinColor} />
              </mesh>
              {isSuspect && (
                <group ref={weaponGroupRef} position={[0, -0.28, 0.04]} visible={showWeaponInHand}>
                  {currentWeapon === 'FIREARM' && <Firearm muzzleFlash={muzzleFlash} />}
                  {currentWeapon === 'KNIFE' && <Knife />}
                  {currentWeapon === 'BLUNT' && <BluntWeapon isBat={isBat} />}
                </group>
              )}
            </group>
          </group>
        </group>

        <Head
          skinColor={skinColor}
          hairColor={hairColor}
          isSuspect={isSuspect}
          headRef={headRef}
          neckRef={neckRef}
        />
      </group>
    </group>
  )
})

HumanFigure.displayName = 'HumanFigure'

export default HumanFigure
