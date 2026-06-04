/**
 * Maps case / ML input fields to reconstruction crime codes.
 */
export function determineCrimeType(caseData = {}) {
  const caseType = normalize(
    caseData.caseType ??
      caseData.case_type ??
      caseData.predictedCrime ??
      caseData.scenario ??
      ''
  )
  const entryMethod = normalize(
    caseData.entryMethod ?? caseData.entry_method ?? ''
  )
  const weaponPresent = parseWeapon(caseData.weaponPresent ?? caseData.weapon_present)
  const weaponType = normalize(caseData.weaponType ?? caseData.weapon_type ?? '')
  const numberOfVictims = Number(
    caseData.numberOfVictims ??
      caseData.victimCount ??
      caseData.victim_count ??
      (caseData.body_detected || caseData.bodyDetected ? 1 : 0)
  )
  const bodyDetected = parseBool(caseData.body_detected ?? caseData.bodyDetected)

  if (caseType === 'homicide' || caseType === 'murder') return 'MURDER'
  if (caseType === 'robbery' || caseType === 'theft') {
    if (
      entryMethod.includes('forced') ||
      entryMethod.includes('broken') ||
      entryMethod.includes('window')
    ) {
      return 'BURGLARY'
    }
    return 'THEFT'
  }
  if (caseType === 'assault' || caseType === 'battery') {
    if (weaponPresent && (weaponType.includes('firearm') || weaponType.includes('gun'))) {
      return 'ARMED_ASSAULT'
    }
    return 'ASSAULT'
  }
  if (caseType === 'burglary') return 'BURGLARY'
  if (caseType === 'kidnapping') return 'KIDNAPPING'

  if (bodyDetected && weaponPresent) return 'MURDER'
  if (weaponPresent && numberOfVictims > 0) return 'MURDER'
  if (
    entryMethod.includes('forced') ||
    entryMethod.includes('broken') ||
    entryMethod.includes('window')
  ) {
    return 'BURGLARY'
  }
  if (!weaponPresent && !bodyDetected) return 'THEFT'

  return 'ASSAULT'
}

export function scenarioToCaseData(scenario, scenarioRow = {}) {
  const caseType = scenario
  const weaponStr = scenarioRow.weapon || ''
  const entry = scenarioRow.entry || ''
  return {
    caseType,
    case_type: caseType,
    weaponPresent: weaponStr.includes('YES') ? 'Yes' : 'No',
    weapon_present: weaponStr.includes('YES'),
    weaponType: weaponStr.includes('FIREARM')
      ? 'Firearm'
      : weaponStr.includes('KNIFE')
        ? 'Knife'
        : 'None',
    entryMethod: entry.replace(/_/g, ' '),
    entry_method: entry,
    numberOfVictims: (scenarioRow.bodyDetected || '').includes('YES') ? 1 : 0,
    body_detected: (scenarioRow.bodyDetected || '').includes('YES'),
    bodyDetected: (scenarioRow.bodyDetected || '').includes('YES'),
  }
}

export function crimeTypeToStoreExtras(crime) {
  switch (crime) {
    case 'MURDER':
      return {
        evidenceItems: ['Firearm', 'Laptop', 'Blood Sample'],
        victimCount: 1,
        suspectCount: 1,
        caseId: 'CPD-047',
      }
    case 'THEFT':
      return {
        evidenceItems: ['Laptop', 'Window Glass'],
        victimCount: 0,
        suspectCount: 1,
        caseId: 'CPD-046',
      }
    case 'BURGLARY':
      return {
        evidenceItems: ['Laptop', 'Window Glass', 'Fingerprints'],
        victimCount: 0,
        suspectCount: 1,
        caseId: 'CPD-048',
      }
    case 'ARMED_ASSAULT':
      return {
        evidenceItems: ['Firearm', 'Blood Sample'],
        victimCount: 1,
        suspectCount: 1,
        caseId: 'CPD-049',
      }
    case 'ASSAULT':
      return {
        evidenceItems: ['Blood Sample'],
        victimCount: 1,
        suspectCount: 1,
        caseId: 'CPD-042',
      }
    default:
      return {
        evidenceItems: ['Firearm', 'Laptop', 'Blood Sample'],
        victimCount: 1,
        suspectCount: 1,
        caseId: 'CPD-047',
      }
  }
}

function normalize(v) {
  return String(v).trim().toLowerCase().replace(/_/g, ' ')
}

function parseWeapon(v) {
  if (typeof v === 'boolean') return v
  const s = normalize(v)
  return s === 'yes' || s === 'true' || s === '1'
}

function parseBool(v) {
  if (typeof v === 'boolean') return v
  const s = String(v).toUpperCase()
  return s.includes('YES') || s === 'TRUE'
}
