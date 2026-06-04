import { useRef, useState, useCallback, useEffect, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import EnvironmentBuilder from '../components/reconstruction/EnvironmentBuilder'
import Character from '../components/reconstruction/Character'
import EvidenceObjects from '../components/reconstruction/EvidenceObjects'
import CinematicCamera, { cameraShake } from '../components/reconstruction/CinematicCamera'
import { BulletTrajectory, EvidencePulseRings } from '../components/reconstruction/SceneEffects'
import EvidenceMarker from '../components/reconstruction/EvidenceMarker'
import GlassShards from '../components/reconstruction/GlassShards'
import SceneLighting from '../components/reconstruction/SceneLighting'
import DroppedWeaponMarker from '../components/reconstruction/weapons/DroppedWeaponMarker'
import {
  GoldChain,
  StolenGoldInHand,
  CarModel,
  BloodWallSmear,
  WoundMarker,
} from '../components/reconstruction/SceneProps'
import CaseDataPanel from '../components/reconstruction/CaseDataPanel'
import { SceneInfoBadges } from '../components/reconstruction/ReconstructionOverlays'
import { resolveEnvironment, isOutdoorEnv } from '../utils/resolveEnvironment'
import { parseWitnessStatement } from '../utils/witnessParser'
import { runWitnessDrivenSequence, resolveWeaponKey } from '../utils/crimeSequenceEngine'
import { useReconstructionStore, useCrimeStore } from '../store/reconstructionStore'
import { useCaseStore } from '../store/caseStore'
import {
  parseCrimeHour,
  getLightingForTime,
  getEntryConfig,
  getWeaponConfig,
  MARKER_POSITIONS,
} from '../utils/caseDataUtils'
import { determineCrimeType } from '../utils/determineCrimeType'
import {
  ACT_LABELS,
  ACT_TITLES,
  NARRATIONS,
  getActCount,
} from '../data/reconstructionActs'
import {
  initReconstructionAudio,
  playReconstructionSound,
} from '../utils/reconstructionSounds'

const CRIME_OPTIONS = ['MURDER', 'THEFT', 'BURGLARY', 'ASSAULT', 'ARMED_ASSAULT']

function CaseScene(props) {
  const {
    suspectAnim,
    victimAnim,
    suspectPos,
    victimPos,
    victim2Pos,
    suspectRot,
    victimRot,
    showVictim,
    showVictim2,
    showWitness,
    witnessPos,
    showLookout,
    lookoutPos,
    bloodRef,
    showBlood,
    showLaptop,
    showFirearm,
    showTrajectory,
    showEvidenceGlow,
    showEvidenceMarkers,
    detectedObjects,
    currentAct,
    predictedCrime,
    isPlaying,
    locationType,
    lighting,
    doorRef,
    showGlassShards,
    weaponType3d,
    showWeaponInHand,
    hasWeaponEvidence,
    muzzleFlash,
    envType,
    isNight,
    victimWasSleeping,
    hasGold,
    showCar,
    carHeadlights,
    carMove,
    showGoldOnVictim,
    showGoldInHand,
    showBloodSmear,
    showWoundMarker,
    showDroppedWeapon,
    dropWeaponPos,
    suspectShirtColor,
    narrativeText,
  } = props

  const outdoor = isOutdoorEnv(envType)

  return (
    <>
      <color attach="background" args={['#0a0f1a']} />
      {!outdoor && <fog attach="fog" args={[lighting.fogColor, lighting.fogNear, lighting.fogFar]} />}

      <SceneLighting envType={envType} isNight={isNight} />
      <EnvironmentBuilder
        envType={envType}
        doorRef={doorRef}
        victimWasSleeping={victimWasSleeping}
        isNight={isNight}
        hasGold={hasGold}
      />
      <ContactShadows opacity={0.55} scale={outdoor ? 20 : 14} blur={2.5} far={8} />

      {showCar && <CarModel headlightsOn={carHeadlights} moveOffset={carMove} />}

      <GlassShards active={showGlassShards} position={[4, 1.5, -3.5]} />
      <BloodWallSmear visible={showBloodSmear} />
      <WoundMarker visible={showWoundMarker} position={[victimPos[0] + 0.1, 1.1, victimPos[2]]} />

      <Character
        currentAnim={suspectAnim}
        position={suspectPos}
        rotation={suspectRot}
        color="#222222"
        shirtColor={suspectShirtColor}
        currentWeapon={weaponType3d}
        showWeaponInHand={showWeaponInHand}
        muzzleFlash={muzzleFlash}
        narrativeText={narrativeText}
      />
      {showLookout && (
        <Character
          currentAnim="lookout"
          position={lookoutPos}
          rotation={[0, -Math.PI / 2, 0]}
          color="#333344"
        />
      )}
      {showVictim && (
        <group position={victimPos}>
          <GoldChain visible={showGoldOnVictim} position={[0, 1.35, 0]} />
          <Character currentAnim={victimAnim} position={[0, 0, 0]} rotation={victimRot} />
        </group>
      )}
      {showVictim2 && (
        <Character
          currentAnim={victimAnim}
          position={victim2Pos}
          rotation={[0, Math.PI * 0.8, 0]}
          color="#8a6a5a"
        />
      )}
      {showWitness && (
        <Character
          currentAnim="idle"
          position={witnessPos}
          rotation={[0, -Math.PI * 0.75, 0]}
          color="#556677"
        />
      )}

      <StolenGoldInHand visible={showGoldInHand} suspectPos={suspectPos} />
      <DroppedWeaponMarker
        visible={
          showDroppedWeapon &&
          (hasWeaponEvidence || weaponType3d === 'FIREARM' || weaponType3d === 'KNIFE' || weaponType3d === 'BLUNT')
        }
        position={dropWeaponPos}
        weaponType={weaponType3d}
        label={weaponType3d}
        isBat={(narrativeText || '').toLowerCase().includes('bat')}
      />

      <EvidenceObjects
        bloodRef={bloodRef}
        showBlood={showBlood}
        showLaptop={showLaptop && detectedObjects.includes('laptop')}
        showFirearm={false}
      />

      <BulletTrajectory visible={showTrajectory} />
      <EvidencePulseRings visible={showEvidenceGlow && !showEvidenceMarkers} />
      {showEvidenceMarkers &&
        detectedObjects.map((obj) =>
          MARKER_POSITIONS[obj] ? (
            <EvidenceMarker key={obj} {...MARKER_POSITIONS[obj]} visible />
          ) : null
        )}

      {isPlaying ? (
        <CinematicCamera currentAct={currentAct} crimeType={predictedCrime} isPlaying={isPlaying} />
      ) : (
        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          minDistance={2}
          maxDistance={16}
          maxPolarAngle={Math.PI / 2 - 0.05}
          target={[0, 1.2, 0]}
        />
      )}
    </>
  )
}

function CameraShakeBridge({ trigger }) {
  const { camera } = useThree()
  useEffect(() => {
    if (trigger > 0) cameraShake(camera, 0.12, 0.8)
  }, [trigger, camera])
  return null
}

export default function Reconstruction() {
  const navigate = useNavigate()
  const bloodRef = useRef(null)
  const doorRef = useRef()
  const suspectPosRef = useRef({ x: -4, y: 0, z: 1 })
  const playingRef = useRef(false)
  const [shakeTrigger, setShakeTrigger] = useState(0)

  const caseLoaded = useCaseStore((s) => Boolean(s.caseId?.trim() && s.caseTitle?.trim()))
  const caseId = useCaseStore((s) => s.caseId)
  const caseType = useCaseStore((s) => s.caseType)
  const address = useCaseStore((s) => s.address)
  const locationType = useCaseStore((s) => s.locationType) || 'HOUSE'
  const timeOfCrime = useCaseStore((s) => s.timeOfCrime) || '22:00'
  const dayOfWeek = useCaseStore((s) => s.dayOfWeek)
  const entryMethod = useCaseStore((s) => s.entryMethod)
  const weaponPresent = useCaseStore((s) => s.weaponPresent)
  const weaponType = useCaseStore((s) => s.weaponType)
  const numberOfSuspects = useCaseStore((s) => s.numberOfSuspects) || 1
  const numberOfVictims = useCaseStore((s) => s.numberOfVictims) || 1
  const officerNarrative = useCaseStore((s) => s.officerNarrative)
  const detectedObjects = useCaseStore((s) => s.detectedObjects) || []
  const storePredictedCrime = useCaseStore((s) => s.predictedCrime)
  const mlConfidence = useCaseStore((s) => s.mlConfidence)
  const incidentDate = useCaseStore((s) => s.incidentDate)
  const witnessStatements = useCaseStore((s) => s.witnessStatements) || []

  const fullNarrative = [officerNarrative, ...witnessStatements].filter(Boolean).join('\n')
  const witnessData = parseWitnessStatement(fullNarrative, {
    numberOfSuspects,
    numberOfVictims,
    weaponType,
    weaponPresent,
  })

  const crimeHour = parseCrimeHour(witnessData.crimeTime || timeOfCrime)
  const isNight = crimeHour >= 20 || crimeHour < 6
  const envType = resolveEnvironment(locationType, address)
  const victimWasSleeping = witnessData.victims[0]?.wasSleeping
  const hasGold = witnessData.itemsStolen.includes('GOLD')
  const hasWeaponEvidence = detectedObjects.includes('weapon')
  const lighting = getLightingForTime(isNight ? 22 : crimeHour)
  const entryConfig = getEntryConfig(entryMethod)
  const weaponConfig = getWeaponConfig(weaponPresent, weaponType)
  const resolvedWeaponKey = resolveWeaponKey(witnessData, weaponPresent, weaponType)
  const multiSuspectNote =
    numberOfSuspects > 2
      ? `Note: Reconstruction simplified — showing primary suspect only. ${numberOfSuspects} suspects total recorded.`
      : null

  const [suspectAnim, setSuspectAnim] = useState('idle')
  const [victimAnim, setVictimAnim] = useState('idle')
  const [suspectPos, setSuspectPos] = useState(entryConfig.suspectStartPos)
  const [victimPos, setVictimPos] = useState(witnessData.victims[0]?.startPosition || [0.5, 0, 0])
  const [victim2Pos, setVictim2Pos] = useState([2.5, 0, -0.5])
  const [suspectRot, setSuspectRot] = useState(entryConfig.suspectStartRot)
  const [victimRot, setVictimRot] = useState(witnessData.victims[0]?.startRotation || [0, Math.PI, 0])
  const [showVictim, setShowVictim] = useState(Number(numberOfVictims) > 0)
  const [showVictim2, setShowVictim2] = useState(false)
  const [showWitness, setShowWitness] = useState(witnessData.hasWitness)
  const [witnessPos] = useState([3.5, 0, 3.5])
  const [showLookout, setShowLookout] = useState(Number(numberOfSuspects) >= 2)
  const [lookoutPos, setLookoutPos] = useState([-4.2, 0, 2.5])
  const [showBlood, setShowBlood] = useState(false)
  const [showLaptop, setShowLaptop] = useState(true)
  const [showFirearm, setShowFirearm] = useState(weaponConfig.key === 'Firearm')
  const [showTrajectory, setShowTrajectory] = useState(false)
  const [showEvidenceGlow, setShowEvidenceGlow] = useState(false)
  const [showEvidenceMarkers, setShowEvidenceMarkers] = useState(false)
  const [showGlassShards, setShowGlassShards] = useState(false)
  const [weaponType3d, setWeaponType3d] = useState('NONE')
  const [showWeaponInHand, setShowWeaponInHand] = useState(false)
  const [muzzleFlash, setMuzzleFlash] = useState(false)
  const [showCar, setShowCar] = useState(false)
  const [carHeadlights, setCarHeadlights] = useState(false)
  const [carMove, setCarMove] = useState(0)
  const [showGoldOnVictim, setShowGoldOnVictim] = useState(false)
  const [showGoldInHand, setShowGoldInHand] = useState(false)
  const [showBloodSmear, setShowBloodSmear] = useState(false)
  const [showWoundMarker, setShowWoundMarker] = useState(false)
  const [showDroppedWeapon, setShowDroppedWeapon] = useState(false)
  const [dropWeaponPos] = useState([0.4, 0.01, 0.3])
  const [showWeaponBadge, setShowWeaponBadge] = useState(false)
  const suspectShirtColor =
    witnessData.suspects[0]?.clothing === 'white'
      ? '#e0e0e0'
      : witnessData.suspects[0]?.clothing === 'hoodie'
        ? '#222233'
        : '#1a1a22'
  const [showActTitle, setShowActTitle] = useState(false)
  const [narration, setNarration] = useState(entryConfig.entryNarration)
  const [progress, setLocalProgress] = useState(0)
  const progressRef = useRef(0)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  const {
    currentAct,
    isPlaying,
    playbackSpeed,
    setAct,
    setIsPlaying,
    setSpeed,
    reset: resetStore,
  } = useReconstructionStore()

  const animateProgress = useCallback(
    (targetProgress, durationMs) =>
      new Promise((resolve) => {
        const anim = { value: progressRef.current }
        gsap.to(anim, {
          value: targetProgress,
          duration: durationMs / 1000 / playbackSpeed,
          ease: 'none',
          onUpdate: () => setLocalProgress(anim.value),
          onComplete: resolve,
        })
      }),
    [playbackSpeed]
  )

  const overrideCrime = useCrimeStore((s) => s.predictedCrime)
  const setPredictedCrime = useCrimeStore((s) => s.setPredictedCrime)

  const derivedCrime =
    storePredictedCrime ||
    determineCrimeType({
      caseType,
      entryMethod,
      weaponPresent,
      weaponType,
      numberOfVictims,
      body_detected: Number(numberOfVictims) > 0,
    })
  const predictedCrime = overrideCrime || derivedCrime || 'MURDER'
  const legacyConfidence = useCrimeStore((s) => s.confidence)
  const confidence = mlConfidence || legacyConfidence || 0

  const actCount = getActCount(predictedCrime)
  const acts = (ACT_LABELS[predictedCrime] || ACT_LABELS.MURDER).slice(0, actCount)
  const narrations = NARRATIONS[predictedCrime] || NARRATIONS.MURDER

  useEffect(() => {
    setNarration(narrations[0] || '')
    document.addEventListener('click', initReconstructionAudio, { once: true })
    return () => document.removeEventListener('click', initReconstructionAudio)
  }, [predictedCrime])

  useEffect(() => {
    gsap.globalTimeline.timeScale(playbackSpeed)
  }, [playbackSpeed])

  useEffect(() => {
    if (!isPlaying) return
    setShowActTitle(true)
    const t = setTimeout(() => setShowActTitle(false), 2200)
    return () => clearTimeout(t)
  }, [currentAct, isPlaying])

  const autoPlayRef = useRef(false)

  const delay = useCallback(
    (ms) => new Promise((r) => setTimeout(r, ms / playbackSpeed)),
    [playbackSpeed]
  )

  const revealBlood = useCallback(async () => {
    const showPool =
      detectedObjects.includes('blood') ||
      detectedObjects.includes('body') ||
      (Number(numberOfVictims) > 0 &&
        ['MURDER', 'ARMED_ASSAULT', 'ASSAULT'].includes(predictedCrime))
    if (!showPool) return
    setShowBlood(true)
    await delay(50)
    if (bloodRef.current) {
      await new Promise((resolve) => {
        gsap.fromTo(
          bloodRef.current.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.out', onComplete: resolve }
        )
      })
    }
  }, [delay, detectedObjects, numberOfVictims, predictedCrime])

  const animateSuspectTo = useCallback(
    (pos, durationMs) =>
      new Promise((resolve) => {
        gsap.to(suspectPosRef.current, {
          x: pos[0],
          y: pos[1],
          z: pos[2],
          duration: durationMs / 1000 / playbackSpeed,
          ease: 'power1.inOut',
          onUpdate: () =>
            setSuspectPos([
              suspectPosRef.current.x,
              suspectPosRef.current.y,
              suspectPosRef.current.z,
            ]),
          onComplete: resolve,
        })
      }),
    [playbackSpeed]
  )

  const goAct = useCallback(
    (act, prog) => {
      setAct(act)
      setNarration(narrations[act] || '')
      setLocalProgress(prog)
    },
    [narrations, setAct]
  )

  const resetVisuals = useCallback(() => {
    gsap.globalTimeline.clear()
    if (doorRef.current) gsap.set(doorRef.current.rotation, { y: 0 })
    const start = entryConfig.suspectStartPos
    suspectPosRef.current = { x: start[0], y: start[1], z: start[2] }
    setSuspectPos(start)
    const v0 = witnessData.victims[0]
    setVictimPos(v0?.startPosition || [0.5, 0, 0])
    setSuspectRot(entryConfig.suspectStartRot)
    setVictimRot(v0?.startRotation || [0, Math.PI, 0])
    setSuspectAnim('idle')
    setVictimAnim('idle')
    setShowVictim(Number(numberOfVictims) > 0)
    setShowVictim2(false)
    setShowWitness(witnessData.hasWitness)
    setShowLookout(
      witnessData.suspectCount >= 2 && witnessData.suspects[1]?.role === 'LOOKOUT'
    )
    setShowBlood(false)
    setShowLaptop(true)
    setShowFirearm(resolvedWeaponKey === 'Firearm')
    setShowTrajectory(false)
    setShowEvidenceGlow(false)
    setShowEvidenceMarkers(false)
    setShowGlassShards(false)
    setShowWeaponInHand(false)
    setWeaponType3d(witnessData.weaponDetails.type)
    setMuzzleFlash(false)
    setShowCar(false)
    setCarHeadlights(false)
    setCarMove(0)
    setShowGoldOnVictim(false)
    setShowGoldInHand(false)
    setShowBloodSmear(false)
    setShowWoundMarker(false)
    setShowDroppedWeapon(false)
    setShowWeaponBadge(false)
    if (bloodRef.current) gsap.set(bloodRef.current.scale, { x: 0, y: 0, z: 0 })
  }, [entryConfig, witnessData, numberOfVictims, numberOfSuspects, resolvedWeaponKey])


  const sequenceCtx = useCallback(
    () => ({
      witnessData,
      predictedCrime,
      entryConfig,
      resetVisuals,
      setNarration,
      setSuspectAnim,
      setVictimAnim,
      setSuspectPos,
      setVictimPos,
      setVictimRot,
      setSuspectRot,
      setShowVictim,
      setShowVictim2,
      setShowWitness,
      setShowLookout,
      setLookoutPos,
      setShowBlood,
      setShowLaptop,
      setShowFirearm,
      setShowTrajectory,
      setShowEvidenceGlow,
      setShowEvidenceMarkers,
      setShowGlassShards,
      setShakeTrigger,
      setWeaponType: setWeaponType3d,
      setShowWeapon3d: setShowWeaponInHand,
      setMuzzleFlash,
      setShowCar,
      setCarHeadlights,
      setCarMoving: (v) => setCarMove(v ? 4 : 0),
      setShowGoldOnVictim,
      setShowGoldInHand,
      setShowBloodSmear,
      setShowWoundMarker,
      setShowDroppedWeapon,
      setLocalProgress,
      goAct,
      delay,
      animateSuspectTo,
      revealBlood,
      suspectPosRef,
      doorRef,
      gsap,
      playbackSpeed,
      detectedObjects,
    }),
    [
      witnessData,
      predictedCrime,
      entryConfig,
      resetVisuals,
      goAct,
      delay,
      animateSuspectTo,
      revealBlood,
      playbackSpeed,
      detectedObjects,
    ]
  )

  const playCaseDrivenSequence = useCallback(async () => {
    resetVisuals()
    setShowWeaponBadge(true)
    await runWitnessDrivenSequence(sequenceCtx())
  }, [resetVisuals, sequenceCtx])

  const playMurderSequence = useCallback(async () => {
    if (caseLoaded) {
      await playCaseDrivenSequence()
      return
    }
    resetVisuals()
    setShowVictim(true)
    goAct(0, 5)
    playReconstructionSound('door')
    setSuspectAnim('walk')
    await Promise.all([
      animateSuspectTo([0, 0, 1], 2500),
      animateProgress(5, 25, 2500),
    ])

    goAct(1, 25)
    playReconstructionSound('footsteps')
    setSuspectAnim('punch')
    setSuspectRot([0, Math.PI, 0])
    await delay(1500)

    goAct(2, 50)
    setShowTrajectory(true)
    playReconstructionSound('gunshot')
    setVictimAnim('fall')
    setVictimRot([1.35, Math.PI, 0])
    setShakeTrigger((n) => n + 1)
    playReconstructionSound('fall')
    await revealBlood()
    await delay(1200)

    goAct(3, 75)
    setShowEvidenceGlow(true)
    setSuspectAnim('idle')
    await animateProgress(75, 95, 2500)

    goAct(4, 95)
    setSuspectAnim('run')
    await Promise.all([
      animateSuspectTo([5, 0, 4], 1200),
      animateProgress(95, 100, 1200),
    ])
    setSuspectAnim('idle')
    setLocalProgress(100)
  }, [caseLoaded, playCaseDrivenSequence, resetVisuals, goAct, animateSuspectTo, delay, revealBlood, animateProgress])

  const playTheftSequence = useCallback(async () => {
    resetVisuals()
    setShowVictim(false)
    suspectPosRef.current = { x: 4, y: 0, z: 1 }
    setSuspectPos([4, 0, 1])
    setSuspectRot([0, -Math.PI / 2, 0])

    goAct(0, 10)
    playReconstructionSound('glass')
    setSuspectAnim('walk')
    await Promise.all([
      animateSuspectTo([2, 0, -1], 2000),
      animateProgress(10, 35, 2000),
    ])

    goAct(1, 35)
    setSuspectAnim('pickup')
    await Promise.all([delay(2500), animateProgress(35, 60, 2500)])

    goAct(2, 60)
    setShowLaptop(false)
    await Promise.all([delay(1500), animateProgress(60, 90, 1500)])

    goAct(3, 90)
    setSuspectAnim('run')
    await Promise.all([
      animateSuspectTo([5, 0, 1], 1000),
      animateProgress(90, 100, 1000),
    ])
    setLocalProgress(100)
  }, [resetVisuals, goAct, animateSuspectTo, delay, animateProgress])

  const playBurglarySequence = useCallback(async () => {
    resetVisuals()
    setShowVictim(false)
    goAct(0, 10)
    playReconstructionSound('door')
    setSuspectAnim('walk')
    await Promise.all([
      animateSuspectTo([-1, 0, 0], 2200),
      animateProgress(10, 35, 2200),
    ])

    goAct(1, 35)
    setSuspectAnim('pickup')
    await Promise.all([delay(2200), animateProgress(35, 65, 2200)])

    goAct(2, 65)
    setShowLaptop(false)
    setShowEvidenceGlow(true)
    await Promise.all([delay(1800), animateProgress(65, 90, 1800)])

    goAct(3, 90)
    setSuspectAnim('run')
    await Promise.all([
      animateSuspectTo([4, 0, 3], 1100),
      animateProgress(90, 100, 1100),
    ])
    setLocalProgress(100)
  }, [resetVisuals, goAct, animateSuspectTo, delay, animateProgress])

  const playAssaultSequence = useCallback(async () => {
    resetVisuals()
    setShowFirearm(false)
    goAct(0, 15)
    setSuspectAnim('walk')
    await Promise.all([
      animateSuspectTo([0, 0, 0.5], 2000),
      animateProgress(15, 50, 2000),
    ])

    goAct(1, 50)
    setSuspectAnim('punch')
    playReconstructionSound('footsteps')
    await Promise.all([delay(2000), animateProgress(50, 85, 2000)])

    goAct(2, 85)
    setVictimAnim('fall')
    setVictimRot([1.2, Math.PI, 0])
    setShakeTrigger((n) => n + 1)
    await revealBlood()
    await animateProgress(85, 100, 1500)
    setLocalProgress(100)
  }, [resetVisuals, goAct, animateSuspectTo, delay, revealBlood, animateProgress])

  const playArmedAssaultSequence = useCallback(async () => {
    resetVisuals()
    goAct(0, 10)
    setSuspectAnim('walk')
    await Promise.all([
      animateSuspectTo([0, 0, 1], 2000),
      animateProgress(10, 35, 2000),
    ])

    goAct(1, 35)
    setSuspectAnim('punch')
    await Promise.all([delay(1200), animateProgress(35, 65, 1200)])

    goAct(2, 65)
    setShowTrajectory(true)
    playReconstructionSound('gunshot')
    setVictimAnim('fall')
    setShakeTrigger((n) => n + 1)
    await revealBlood()

    goAct(3, 90)
    setShowEvidenceGlow(true)
    await Promise.all([delay(2000), animateProgress(90, 100, 2000)])
    setLocalProgress(100)
  }, [resetVisuals, goAct, animateSuspectTo, delay, revealBlood, animateProgress])

  const playSequence = useCallback(async () => {
    playingRef.current = true
    setIsPlaying(true)
    setLocalProgress(0)

    if (caseLoaded) {
      await playCaseDrivenSequence()
      playingRef.current = false
      setIsPlaying(false)
      return
    }

    switch (predictedCrime) {
      case 'THEFT':
        await playTheftSequence()
        break
      case 'BURGLARY':
        await playBurglarySequence()
        break
      case 'ASSAULT':
        await playAssaultSequence()
        break
      case 'ARMED_ASSAULT':
        await playArmedAssaultSequence()
        break
      default:
        await playMurderSequence()
    }

    playingRef.current = false
    setIsPlaying(false)
  }, [
    predictedCrime,
    playMurderSequence,
    playTheftSequence,
    playBurglarySequence,
    playAssaultSequence,
    playArmedAssaultSequence,
    playCaseDrivenSequence,
    caseLoaded,
    setIsPlaying,
  ])

  useEffect(() => {
    if (caseLoaded && !isPlaying && !playingRef.current && !autoPlayRef.current) {
      autoPlayRef.current = true
      playSequence()
    }
  }, [caseLoaded, isPlaying, playSequence])

  const handlePlayPause = () => {
    if (isPlaying || playingRef.current) {
      if (gsap.globalTimeline && !gsap.globalTimeline.paused()) {
        gsap.globalTimeline.pause()
        playingRef.current = false
        setIsPlaying(false)
        return
      }
    }

    if (gsap.globalTimeline && gsap.globalTimeline.paused()) {
      gsap.globalTimeline.play()
      playingRef.current = true
      setIsPlaying(true)
      return
    }

    playSequence()
  }

  const handleReset = () => {
    gsap.globalTimeline.kill()
    playingRef.current = false
    resetStore()
    resetVisuals()
    goAct(0, 0)
  }

  const handleSkipAct = () => {
    const next = Math.min(currentAct + 1, actCount - 1)
    goAct(next, ((next + 1) / actCount) * 100)
  }

  const actTitles = ACT_TITLES[predictedCrime] || ACT_TITLES.MURDER
  const actLabels = ACT_LABELS[predictedCrime] || ACT_LABELS.MURDER

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#03070C',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 70,
          background: '#000',
          zIndex: 100,
          pointerEvents: 'none',
        }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        style={{
          position: 'fixed',
          bottom: 130,
          left: 0,
          right: 0,
          height: 70,
          background: '#000',
          zIndex: 100,
          pointerEvents: 'none',
        }}
        initial={{ scaleY: 0, originY: 1 }}
        animate={{ scaleY: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <AnimatePresence>
        {showActTitle && isPlaying && (
          <motion.div
            key={`${predictedCrime}-${currentAct}`}
            style={{
              position: 'fixed',
              top: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 200,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                color: '#00E5FF',
                fontFamily: 'Courier New, monospace',
                fontSize: 11,
                letterSpacing: 4,
                marginBottom: 4,
                textShadow: '0 2px 20px rgba(0,0,0,0.9)',
              }}
            >
              — {actLabels[currentAct]} —
            </div>
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Georgia, serif',
                fontSize: 24,
                fontWeight: 'bold',
                textShadow: '0 2px 20px rgba(0,0,0,0.9)',
              }}
            >
              {actTitles[currentAct]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SceneInfoBadges
        timeOfCrime={timeOfCrime}
        dayOfWeek={dayOfWeek}
        incidentDate={incidentDate}
        address={address}
        locationType={envType}
        envType={envType}
        weaponType={weaponType3d}
        weaponVisible={showWeaponBadge}
        witnessData={witnessData}
        currentAct={currentAct}
      />

      <header className="recon-header">
        <span className="recon-header-title">
          FORENSIC 3D RECONSTRUCTION
          <span className="recon-crime-badge">{predictedCrime}</span>
        </span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <label style={{ fontFamily: 'monospace', fontSize: 9, color: '#00E5FF' }}>
            Override:
            <select
              value={predictedCrime}
              onChange={(e) => {
                setPredictedCrime(e.target.value)
                useCaseStore.getState().updateField('predictedCrime', e.target.value)
                handleReset()
              }}
              style={{
                marginLeft: 6,
                background: '#0A1628',
                border: '1px solid rgba(0,229,255,0.35)',
                color: '#00E5FF',
                fontSize: 10,
                padding: '2px 6px',
                borderRadius: 4,
              }}
            >
              {CRIME_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#94A3B8' }}>{caseId}</span>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#FFD700' }}>
            ML {Math.round(confidence || 0)}%
          </span>
          <button type="button" onClick={() => navigate('/dashboard')} className="recon-btn-ctrl">
            ← DASHBOARD
          </button>
        </div>
      </header>

      {!caseLoaded && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(3,7,12,0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Courier New, monospace',
            padding: 24,
          }}
        >
          <p style={{ color: '#00E5FF', fontSize: 14, letterSpacing: 3, marginBottom: 12 }}>
            NO CASE LOADED
          </p>
          <p style={{ color: '#888', fontSize: 12, maxWidth: 420, textAlign: 'center', lineHeight: 1.6 }}>
            Go to Case Information to enter case details. The reconstruction will use your entry method,
            weapon, location, narrative, and ML prediction.
          </p>
          <button
            type="button"
            onClick={() => navigate('/case-info')}
            style={{ ...ctrlBtnPrimary, marginTop: 20 }}
          >
            OPEN CASE INFORMATION
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} style={{ ...ctrlBtn, marginTop: 10 }}>
            ← DASHBOARD
          </button>
        </div>
      )}

      <CaseDataPanel
        caseData={{
          caseId,
          caseType,
          address,
          locationType: envType,
          envBasis: address,
          timeOfCrime,
          dayOfWeek,
          entryMethod,
          weaponType: weaponConfig.key,
          numberOfSuspects,
          numberOfVictims,
          predictedCrime,
          mlConfidence: confidence,
          lightingLabel: lighting.label,
        }}
        weaponConfig={weaponConfig}
        multiSuspectNote={multiSuspectNote}
        detectedObjects={detectedObjects}
      />

      <div className="recon-disclaimer">
        ⚠ FORENSIC AID ONLY — This reconstruction is probabilistic ({Math.round(confidence || 0)}%
        confidence). Actual events may differ. Not admissible as direct evidence. For investigative
        guidance only.
      </div>

      <div style={{ flex: 1, position: 'relative', minHeight: 0, marginRight: 240 }}>
        <Canvas
          shadows
          camera={{ position: [0, 2.5, 6], fov: 55 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <CaseScene
              suspectAnim={suspectAnim}
              victimAnim={victimAnim}
              suspectPos={suspectPos}
              victimPos={victimPos}
              victim2Pos={victim2Pos}
              suspectRot={suspectRot}
              victimRot={victimRot}
              showVictim={showVictim}
              showVictim2={showVictim2}
              showWitness={showWitness}
              witnessPos={witnessPos}
              showLookout={showLookout}
              lookoutPos={lookoutPos}
              bloodRef={bloodRef}
              showBlood={showBlood}
              showLaptop={showLaptop}
              showFirearm={showFirearm}
              showTrajectory={showTrajectory}
              showEvidenceGlow={showEvidenceGlow}
              showEvidenceMarkers={showEvidenceMarkers}
              detectedObjects={detectedObjects}
              currentAct={currentAct}
              predictedCrime={predictedCrime}
              isPlaying={isPlaying}
              lighting={lighting}
              doorRef={doorRef}
              showGlassShards={showGlassShards}
              weaponType3d={weaponType3d}
              envType={envType}
              isNight={isNight}
              victimWasSleeping={victimWasSleeping}
              hasGold={hasGold}
              showWeaponInHand={showWeaponInHand}
              hasWeaponEvidence={hasWeaponEvidence}
              muzzleFlash={muzzleFlash}
              showCar={showCar}
              carHeadlights={carHeadlights}
              carMove={carMove}
              showGoldOnVictim={showGoldOnVictim}
              showGoldInHand={showGoldInHand}
              showBloodSmear={showBloodSmear}
              showWoundMarker={showWoundMarker}
              showDroppedWeapon={showDroppedWeapon}
              dropWeaponPos={dropWeaponPos}
              suspectShirtColor={suspectShirtColor}
              narrativeText={fullNarrative}
            />
            <CameraShakeBridge trigger={shakeTrigger} />
          </Suspense>
        </Canvas>
      </div>

      <footer className="recon-footer">
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          {acts.map((label, id) => (
            <button
              key={id}
              type="button"
              onClick={() => goAct(id, ((id + 1) / actCount) * 100)}
              className={`recon-act-tab ${currentAct === id ? 'recon-act-tab--active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          style={{
            height: 4,
            background: 'rgba(0,229,255,0.1)',
            borderRadius: 2,
            marginBottom: 10,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00E5FF, #0066aa)',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
        <p className="recon-narration">{narration}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button type="button" onClick={handleReset} className="recon-btn-ctrl">
            ⏮ Reset
          </button>
          <button type="button" onClick={handlePlayPause} className="recon-btn-play">
            {isPlaying ? '⏸ Pause' : '⏯ Play'}
          </button>
          <button type="button" onClick={handleSkipAct} className="recon-btn-ctrl">
            ⏭ Skip Act
          </button>
          <span style={{ color: '#64748B', fontSize: 10 }}>|</span>
          {[0.5, 1, 2].map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => setSpeed(speed)}
              className="recon-btn-ctrl"
              style={{ color: playbackSpeed === speed ? '#00E5FF' : '#64748B' }}
            >
              {speed}x
            </button>
          ))}
        </div>
      </footer>
    </div>
  )
}

const ctrlBtn = {
  fontFamily: 'Courier New, monospace',
  fontSize: 10,
  fontWeight: 700,
  color: 'rgba(0,229,255,0.85)',
  background: 'rgba(0,229,255,0.08)',
  border: '1px solid rgba(0,229,255,0.35)',
  padding: '6px 14px',
  borderRadius: 4,
  cursor: 'pointer',
}

const ctrlBtnPrimary = {
  ...ctrlBtn,
  color: '#fff',
  background: 'linear-gradient(135deg, #0066FF, #00AAFF)',
  border: 'none',
}
