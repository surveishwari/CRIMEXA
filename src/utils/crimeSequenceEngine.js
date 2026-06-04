import { playReconstructionSound } from './reconstructionSounds'
import { weaponTypeToKey } from './witnessParser'

/**
 * Witness-driven reconstruction sequences.
 * ctx: setters, delay, animateSuspectTo, goAct, revealBlood, gsap, doorRef, playbackSpeed, setShakeTrigger
 */
export async function runWitnessDrivenSequence(ctx) {
  const { witnessData, predictedCrime, entryConfig } = ctx
  const weapon = witnessData.weaponDetails.type
  const stolen = witnessData.itemsStolen

  if (stolen.includes('VEHICLE') || predictedCrime === 'THEFT' && stolen.includes('VEHICLE')) {
    return runVehicleTheft(ctx)
  }
  if (stolen.includes('GOLD') && witnessData.victimCount > 0) {
    return runGoldTheft(ctx)
  }
  if (stolen.includes('CASH') && witnessData.victimCount > 0) {
    return runRobberyCash(ctx)
  }
  if (weapon === 'FIREARM' || predictedCrime === 'ARMED_ASSAULT') {
    return runFirearmMurder(ctx)
  }
  if (weapon === 'KNIFE') return runKnifeMurder(ctx)
  if (weapon === 'BLUNT') return runBluntMurder(ctx)
  if (weapon === 'HANDS') return runStrangulation(ctx)
  if (weapon === 'ACID') return runAcidAttack(ctx)
  if (predictedCrime === 'THEFT' || predictedCrime === 'BURGLARY') {
    return runPropertyTheft(ctx)
  }
  if (predictedCrime === 'ASSAULT') return runAssault(ctx)
  return runFirearmMurder(ctx)
}

async function runEntry(ctx) {
  const { entryConfig, setNarration, setSuspectAnim, setSuspectPos, suspectPosRef, setShowGlassShards, setShakeTrigger, doorRef, gsap, playbackSpeed, goAct, playReconstructionSound: play } = ctx

  goAct(0, 8)
  setNarration(entryConfig.entryNarration)
  const start = entryConfig.suspectStartPos
  setSuspectPos(start)
  suspectPosRef.current = { x: start[0], y: start[1], z: start[2] }
  setSuspectAnim('walk')

  if (entryConfig.entryEffect === 'DOOR_BURST') {
    play('door')
    if (doorRef?.current) {
      gsap.to(doorRef.current.rotation, {
        y: -1.6,
        duration: 0.3 / playbackSpeed,
        ease: 'back.out(1.4)',
      })
    }
    setShakeTrigger((n) => n + 1)
  } else if (entryConfig.entryEffect === 'GLASS_SHATTER') {
    play('glass')
    setShowGlassShards(true)
    setShakeTrigger((n) => n + 1)
  } else if (entryConfig.entryEffect === 'DOOR_OPEN_SLOW') {
    play('door')
  }

  await ctx.animateSuspectTo([0, 0, 0.6], 2400)
}

async function setupSuspects(ctx) {
  const { witnessData, setShowLookout, setLookoutPos, setSuspect2Pos, setShowSuspect2 } = ctx
  if (witnessData.suspectCount >= 2) {
    const s2 = witnessData.suspects[1]
    if (s2.role === 'LOOKOUT') {
      setShowLookout(true)
      if (ctx.setLookoutPos) ctx.setLookoutPos(s2.startPosition)
    } else {
      setShowSuspect2?.(true)
      setSuspect2Pos?.(s2.startPosition)
    }
  }
}

function setNarration(ctx, text) {
  ctx.setNarration(text)
}

async function runFirearmMurder(ctx) {
  const wd = ctx.witnessData
  const v0 = wd.victims[0]
  ctx.resetVisuals()
  ctx.setWeaponType('FIREARM')
  ctx.setShowVictim(wd.victimCount > 0)
  if (v0) {
    ctx.setVictimPos(v0.startPosition)
    ctx.setVictimRot(v0.startRotation || [0, Math.PI, 0])
  }
  await setupSuspects(ctx)
  await runEntry(ctx)

  if (wd.victimCount > 0) {
    goAct(ctx, 1, 30)
    setNarration(ctx, 'Suspect confronts victim. Firearm raised.')
    ctx.setShowWeapon3d(true)
    ctx.setSuspectAnim('raise_gun')
    ctx.setVictimAnim('back_away')
    if (wd.hasArgument) await ctx.delay(3000)
    else await ctx.delay(1500)

    goAct(ctx, 2, 55)
    setNarration(ctx, 'Shot fired. Ballistic trajectory reconstructed (~15° downward).')
    ctx.setShowTrajectory(true)
    ctx.setMuzzleFlash(true)
    playReconstructionSound('gunshot')
    ctx.setSuspectAnim('raise_gun')
    ctx.setVictimAnim('clutch')
    await ctx.delay(600)
    ctx.setVictimAnim('fall')
    ctx.setVictimRot([1.35, Math.PI, 0])
    ctx.setShakeTrigger((n) => n + 1)
    playReconstructionSound('fall')
    await ctx.revealBlood()

    goAct(ctx, 3, 72)
    ctx.setShowDroppedWeapon(true)
    ctx.setSuspectAnim('idle')
    setNarration(ctx, 'Firearm discarded at scene. Suspect flees.')
    await ctx.delay(1200)
  }

  await runEvidenceAndEscape(ctx)
}

async function runKnifeMurder(ctx) {
  const wd = ctx.witnessData
  const v0 = wd.victims[0]
  ctx.resetVisuals()
  ctx.setWeaponType('KNIFE')
  ctx.setShowVictim(wd.victimCount > 0)
  ctx.setShowBloodSmear(true)
  if (v0) {
    ctx.setVictimPos(v0.startPosition)
    ctx.setVictimRot(v0.startRotation || [0, Math.PI, 0])
  }
  await setupSuspects(ctx)
  await runEntry(ctx)

  goAct(ctx, 1, 32)
  setNarration(ctx, 'Close confrontation. Knife drawn — thrust pattern.')
  ctx.setShowWeapon3d(true)
  ctx.setSuspectAnim('stab')
  ctx.setVictimAnim('idle')
  await ctx.delay(1200)

  goAct(ctx, 2, 58)
  ctx.setShowWoundMarker(true)
  ctx.setSuspectAnim('stab')
  ctx.setVictimAnim('clutch')
  await ctx.delay(800)
  ctx.setVictimAnim('fall_forward')
  ctx.setVictimRot([0.9, Math.PI, 0])
  playReconstructionSound('fall')
  await ctx.revealBlood()

  await runEvidenceAndEscape(ctx)
}

async function runBluntMurder(ctx) {
  const wd = ctx.witnessData
  ctx.resetVisuals()
  ctx.setWeaponType('BLUNT')
  ctx.setShowVictim(wd.victimCount > 0)
  await setupSuspects(ctx)
  await runEntry(ctx)

  goAct(ctx, 1, 35)
  setNarration(ctx, 'Overhead strike — blunt force trauma.')
  ctx.setShowWeapon3d(true)
  ctx.setSuspectAnim('swing_blunt')
  await ctx.delay(1000)

  goAct(ctx, 2, 60)
  ctx.setVictimAnim('fall_side')
  ctx.setVictimRot([0, Math.PI, Math.PI / 2])
  ctx.setShakeTrigger((n) => n + 1)
  playReconstructionSound('fall')
  await ctx.revealBlood()

  await runEvidenceAndEscape(ctx)
}

async function runStrangulation(ctx) {
  const wd = ctx.witnessData
  ctx.resetVisuals()
  ctx.setWeaponType('HANDS')
  ctx.setShowVictim(wd.victimCount > 0)
  await runEntry(ctx)

  goAct(ctx, 1, 40)
  setNarration(ctx, 'Manual strangulation — both hands on neck area.')
  ctx.setSuspectAnim('strangle')
  ctx.setVictimAnim('strangle_victim')
  await ctx.delay(4000)

  goAct(ctx, 2, 75)
  ctx.setVictimAnim('fall_side')
  await ctx.revealBlood()

  await runEvidenceAndEscape(ctx)
}

async function runAcidAttack(ctx) {
  ctx.resetVisuals()
  ctx.setWeaponType('ACID')
  ctx.setShowVictim(true)
  await runEntry(ctx)

  goAct(ctx, 1, 45)
  ctx.setSuspectAnim('swing_blunt')
  ctx.setVictimAnim('back_away')
  setNarration(ctx, 'Corrosive substance deployed — victim staggers back.')
  await ctx.delay(2500)

  await runEvidenceAndEscape(ctx)
}

async function runGoldTheft(ctx) {
  const wd = ctx.witnessData
  ctx.resetVisuals()
  ctx.setShowVictim(true)
  ctx.setShowGoldOnVictim(true)
  await runEntry(ctx)

  goAct(ctx, 1, 40)
  setNarration(ctx, 'Suspect grabs gold necklace from victim.')
  ctx.setSuspectAnim('grab')
  await ctx.delay(1500)
  ctx.setShowGoldOnVictim(false)
  ctx.setShowGoldInHand(true)

  goAct(ctx, 2, 70)
  ctx.setSuspectAnim('run')
  setNarration(ctx, 'Suspect flees with stolen jewelry.')
  await ctx.animateSuspectTo([5, 0, 4], 1400)
  ctx.setLocalProgress(100)
}

async function runRobberyCash(ctx) {
  ctx.resetVisuals()
  ctx.setShowVictim(true)
  await runEntry(ctx)

  goAct(ctx, 1, 35)
  ctx.setSuspectAnim(ctx.witnessData.weaponDetails.type !== 'NONE' ? 'raise_gun' : 'punch')
  ctx.setVictimAnim('surrender')
  setNarration(ctx, 'Victim surrenders — suspect demands valuables.')
  await ctx.delay(2000)

  goAct(ctx, 2, 65)
  ctx.setSuspectAnim('grab')
  setNarration(ctx, 'Wallet/cash taken from victim.')
  await ctx.delay(1500)

  goAct(ctx, 3, 85)
  ctx.setSuspectAnim('run')
  ctx.setVictimAnim('clutch')
  await ctx.animateSuspectTo([5, 0, 3], 1200)
  ctx.setLocalProgress(100)
}

async function runVehicleTheft(ctx) {
  ctx.resetVisuals()
  ctx.setShowCar(true)
  ctx.setShowVictim(true)
  ctx.setVictimPos([0, 0, 1])

  goAct(ctx, 0, 15)
  setNarration(ctx, 'Victim approaches vehicle.')
  ctx.setVictimAnim('walk')
  await ctx.delay(2000)

  goAct(ctx, 1, 40)
  ctx.setSuspectAnim('walk')
  await ctx.animateSuspectTo([0, 0, -1.5], 2000)
  ctx.setSuspectAnim('raise_gun')
  ctx.setVictimAnim('surrender')
  await ctx.delay(2000)

  goAct(ctx, 2, 70)
  ctx.setSuspectAnim('idle')
  ctx.setCarHeadlights(true)
  setNarration(ctx, 'Suspect enters vehicle and flees.')
  await ctx.delay(1500)
  ctx.setCarMoving(true)
  await ctx.delay(2000)
  ctx.setLocalProgress(100)
}

async function runPropertyTheft(ctx) {
  ctx.resetVisuals()
  ctx.setShowVictim(false)
  await runEntry(ctx)

  goAct(ctx, 1, 40)
  ctx.setSuspectAnim('pickup')
  setNarration(ctx, 'Property removed from scene.')
  if (ctx.witnessData.itemsStolen.includes('LAPTOP')) ctx.setShowLaptop(false)
  await ctx.delay(2200)

  await runEvidenceAndEscape(ctx)
}

async function runAssault(ctx) {
  ctx.resetVisuals()
  ctx.setShowVictim(true)
  ctx.setWeaponType(ctx.witnessData.weaponDetails.type)
  await runEntry(ctx)

  goAct(ctx, 1, 50)
  ctx.setSuspectAnim(ctx.witnessData.weaponDetails.type === 'FIREARM' ? 'raise_gun' : 'punch')
  await ctx.delay(2000)

  goAct(ctx, 2, 80)
  ctx.setVictimAnim('fall')
  ctx.setShakeTrigger((n) => n + 1)
  await ctx.revealBlood()
  ctx.setLocalProgress(100)
}

async function runEvidenceAndEscape(ctx) {
  const { witnessData } = ctx
  goAct(ctx, 3, 78)
  ctx.setShowEvidenceMarkers(true)
  ctx.setShowEvidenceGlow(true)
  setNarration(ctx, 'Evidence markers placed per scene photo detections.')
  await ctx.delay(2200)

  goAct(ctx, 4, 92)
  ctx.setSuspectAnim('run')
  const flee = witnessData.escapedNorth ? [0, 0, 6] : [5, 0, 4]
  if (witnessData.suspectCount >= 2) {
    setNarration(ctx, 'Both suspects flee toward exit.')
  }
  await ctx.animateSuspectTo(flee, 1400)
  ctx.setSuspectAnim('idle')
  ctx.setLocalProgress(100)
}

function goAct(ctx, act, prog) {
  ctx.goAct(act, prog)
}

export function resolveWeaponKey(witnessData, weaponPresent, weaponType) {
  const fromStatement = weaponTypeToKey(witnessData.weaponDetails.type)
  if (fromStatement !== 'None') return fromStatement
  return weaponType || 'None'
}
