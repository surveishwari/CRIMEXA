export function deriveLocationType({ address, caseType, entryMethod }) {
  const addr = (address || '').toLowerCase()
  if (addr.includes('apartment') || addr.includes('flat') || addr.includes('apt'))
    return 'APARTMENT'
  if (addr.includes('shop') || addr.includes('store') || addr.includes('mall') || addr.includes('grocery'))
    return 'STORE'
  if (addr.includes('office') || addr.includes('corporate') || addr.includes('wacker') || addr.includes('building'))
    return 'OFFICE'
  if (addr.includes('alley') || addr.includes('lane') || addr.includes('gali'))
    return 'ALLEY'
  if (addr.includes('parking') || addr.includes('lot'))
    return 'PARKING_LOT'
  if (addr.includes('street') || addr.includes('road') || addr.includes('marg') || addr.includes('ave'))
    return 'STREET'
  if (addr.includes('warehouse') || addr.includes('godown'))
    return 'WAREHOUSE'
  const ct = (caseType || '').toLowerCase()
  if (ct.includes('homicide') || ct.includes('murder')) return 'HOUSE'
  if (ct.includes('robbery') || ct.includes('burglary')) return 'STORE'
  if (ct.includes('theft')) return 'STORE'
  if (ct.includes('assault')) return 'ALLEY'
  return 'HOUSE'
}

export function normalizeEntryMethod(entry) {
  const e = (entry || '').toLowerCase()
  if (e.includes('window') || e.includes('break')) return 'Broken Window'
  if (e.includes('fence')) return 'Jumped Fence'
  if (e.includes('unlock') || e.includes('known')) return 'Unlocked Entry'
  if (e.includes('forced')) return 'Forced Door'
  if (e.includes('unknown')) return 'Unknown'
  return entry || 'Unknown'
}

export function parseCrimeHour(timeOfCrime) {
  if (!timeOfCrime) return 22
  const m = String(timeOfCrime).match(/(\d{1,2}):?(\d{2})?/)
  if (m) return parseInt(m[1], 10)
  const n = parseInt(timeOfCrime, 10)
  return Number.isNaN(n) ? 22 : n
}

export function getLightingForTime(hour) {
  if (hour >= 6 && hour < 9)
    return {
      skyColor: '#FF9060',
      ambientIntensity: 0.4,
      sunColor: '#FFB060',
      sunIntensity: 0.8,
      sunPosition: [10, 2, 5],
      fogColor: '#FF9060',
      fogNear: 10,
      fogFar: 35,
      label: 'DAWN',
      night: false,
    }
  if (hour >= 9 && hour < 17)
    return {
      skyColor: '#87CEEB',
      ambientIntensity: 0.8,
      sunColor: '#FFFDE7',
      sunIntensity: 2.0,
      sunPosition: [5, 10, 3],
      fogColor: '#87CEEB',
      fogNear: 15,
      fogFar: 45,
      label: 'DAY',
      night: false,
    }
  if (hour >= 17 && hour < 20)
    return {
      skyColor: '#FF6030',
      ambientIntensity: 0.3,
      sunColor: '#FF8040',
      sunIntensity: 0.6,
      sunPosition: [-8, 3, -5],
      fogColor: '#FF6030',
      fogNear: 10,
      fogFar: 30,
      label: 'EVENING',
      night: false,
    }
  return {
    skyColor: '#050510',
    ambientIntensity: 0.08,
    sunColor: '#3344AA',
    sunIntensity: 0.15,
    sunPosition: [0, 10, 0],
    fogColor: '#050510',
    fogNear: 8,
    fogFar: 25,
    label: 'NIGHT',
    night: true,
  }
}

export const ENTRY_CONFIGS = {
  'Forced Door': {
    suspectStartPos: [-4.5, 0, 0],
    suspectStartRot: [0, Math.PI / 2, 0],
    entryAnimation: 'walk',
    entryEffect: 'DOOR_BURST',
    entryNarration:
      'Suspect forced entry through door. Door frame damage consistent with shoulder impact.',
  },
  'Broken Window': {
    suspectStartPos: [4, 0, -3.5],
    suspectStartRot: [0, -Math.PI / 2, 0],
    entryAnimation: 'walk',
    entryEffect: 'GLASS_SHATTER',
    entryNarration:
      'Suspect entered via broken window. Glass fragments found inside — entry from exterior.',
  },
  'Unlocked Entry': {
    suspectStartPos: [-4.5, 0, 0],
    suspectStartRot: [0, Math.PI / 2, 0],
    entryAnimation: 'walk',
    entryEffect: 'DOOR_OPEN_SLOW',
    entryNarration:
      'No forced entry. Door was unlocked. Suspect may have been known to victim.',
  },
  'Jumped Fence': {
    suspectStartPos: [0, 2.5, -4],
    suspectStartRot: [0, 0, 0],
    entryAnimation: 'walk',
    entryEffect: 'NONE',
    entryNarration: 'Suspect scaled perimeter fence. Entry point: rear boundary.',
  },
  Unknown: {
    suspectStartPos: [-3, 0, -3],
    suspectStartRot: [0, Math.PI / 4, 0],
    entryAnimation: 'walk',
    entryEffect: 'QUESTION_MARKS',
    entryNarration:
      'Entry method unknown. Multiple possible access points highlighted.',
  },
}

export function getEntryConfig(entryMethod) {
  return ENTRY_CONFIGS[normalizeEntryMethod(entryMethod)] || ENTRY_CONFIGS.Unknown
}

export function getWeaponConfig(weaponPresent, weaponType) {
  const present =
    weaponPresent === 'Yes' ||
    weaponPresent === true ||
    String(weaponPresent).toLowerCase() === 'yes'
  if (!present) return WEAPON_CONFIGS.None
  return WEAPON_CONFIGS[weaponType] || WEAPON_CONFIGS.None
}

export const WEAPON_CONFIGS = {
  Firearm: {
    key: 'Firearm',
    suspectHoldAnim: 'punch',
    attackAnim: 'punch',
    victimReactAnim: 'walk',
    victimFallAnim: 'fall',
    trajectoryLine: true,
    dropPosition: [0.4, 0.01, 0.3],
    forensicNote:
      'Ballistic trajectory reconstructed. Entry angle: estimated 15° downward. Shooter height: ~175cm. Distance: ~1.2m from victim.',
  },
  Knife: {
    key: 'Knife',
    suspectHoldAnim: 'punch',
    attackAnim: 'punch',
    victimReactAnim: 'punch',
    victimFallAnim: 'fall',
    trajectoryLine: false,
    dropPosition: [0.2, 0.01, 0.1],
    forensicNote:
      'Stabbing motion reconstructed from wound pattern. Estimated: overhand thrust.',
  },
  'Blunt Object': {
    key: 'Blunt Object',
    suspectHoldAnim: 'punch',
    attackAnim: 'punch',
    victimReactAnim: 'punch',
    victimFallAnim: 'fall',
    trajectoryLine: false,
    dropPosition: [-0.3, 0.01, 0.2],
    forensicNote:
      'Impact force reconstruction: overhead strike. Wound pattern consistent with cylindrical object.',
  },
  None: {
    key: 'None',
    suspectHoldAnim: 'punch',
    attackAnim: 'punch',
    victimReactAnim: 'punch',
    victimFallAnim: 'fall',
    trajectoryLine: false,
    dropPosition: null,
    forensicNote:
      'No weapon detected. Physical altercation — blunt force from hands/feet.',
  },
}

export const MARKER_POSITIONS = {
  body: { pos: [0, 0.01, 0.5], label: 'E-01 · BODY', color: '#FF4444', confidence: 99 },
  weapon: { pos: [0.5, 0.01, 0.2], label: 'E-02 · WEAPON', color: '#FF8C00', confidence: 88 },
  blood: { pos: [0.1, 0.01, 0.8], label: 'E-03 · BLOOD', color: '#CC0000', confidence: 94 },
  laptop: { pos: [3.1, 0.85, -3.4], label: 'E-04 · LAPTOP', color: '#4488FF', confidence: 91 },
  phone: { pos: [2.8, 0.01, -2], label: 'E-05 · PHONE', color: '#44AAFF', confidence: 85 },
  shell: { pos: [0.8, 0.01, 0.3], label: 'E-06 · CASING', color: '#FFD700', confidence: 87 },
  chair: { pos: [-1.5, 0.01, 1], label: 'E-07 · CHAIR', color: '#AAAAAA', confidence: 72 },
}

export function mapYoloToDetected(objects) {
  const map = {
    PERSON: 'body',
    BODY: 'body',
    WEAPON: 'weapon',
    GUN: 'weapon',
    FIREARM: 'weapon',
    BLOOD: 'blood',
    LAPTOP: 'laptop',
    PHONE: 'phone',
    CHAIR: 'chair',
  }
  const out = new Set()
  ;(objects || []).forEach((o) => {
    const key = map[String(o).toUpperCase()]
    if (key) out.add(key)
  })
  return [...out]
}

export function deriveDetectedFromNarrative(text, weaponPresent) {
  const t = (text || '').toLowerCase()
  const found = new Set()
  if (t.includes('blood')) found.add('blood')
  if (t.includes('body') || t.includes('victim')) found.add('body')
  if (t.includes('laptop') || t.includes('computer')) found.add('laptop')
  if (t.includes('phone')) found.add('phone')
  if (t.includes('firearm') || t.includes('gun') || t.includes('pistol')) found.add('weapon')
  if (weaponPresent === 'Yes') found.add('weapon')
  return [...found]
}

export function getDayOfWeek(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { weekday: 'long' })
  } catch {
    return ''
  }
}
