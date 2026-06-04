export function parseWitnessStatement(narrative, caseData = {}) {
  const text = (narrative || '').toLowerCase()
  const suspectCount = Math.min(parseInt(caseData.numberOfSuspects, 10) || 1, 3)
  const victimCount = Math.min(parseInt(caseData.numberOfVictims, 10) || 1, 3)

  const result = {
    suspectCount,
    victimCount,
    suspects: [],
    victims: [],
    itemsStolen: [],
    locationDetails: {},
    sequence: [],
    weaponDetails: {},
    hasWitness: false,
    escapedNorth: false,
    escapedByCar: false,
    escapedByBike: false,
    crimeTime: null,
    hasArgument: false,
  }

  result.suspects = Array.from({ length: suspectCount }, (_, i) => ({
    id: i,
    clothing: text.includes('black')
      ? 'black'
      : text.includes('white shirt')
        ? 'white'
        : text.includes('hoodie')
          ? 'hoodie'
          : 'dark',
    height: text.includes('tall') ? 'tall' : text.includes('short') ? 'short' : 'average',
    role:
      i === 0
        ? 'PRIMARY'
        : text.includes('lookout') || text.includes('watch') || text.includes('door')
          ? 'LOOKOUT'
          : 'SECONDARY',
    startPosition: i === 0 ? [-3.5, 0, 0] : i === 1 ? [-4.2, 0, 2.5] : [-3, 0, 2],
  }))

  result.victims = Array.from({ length: victimCount }, (_, i) => {
    const wasSleeping =
      text.includes('sleep') || text.includes('asleep') || text.includes('in bed')
    const wasSeated =
      text.includes('sitting') ||
      text.includes('seated') ||
      text.includes('desk') ||
      text.includes('chair')
    return {
      id: i,
      wasSleeping,
      wasSeated,
      wasStanding: !wasSleeping && !wasSeated,
      startPosition: wasSleeping
        ? [-1.8, 0.35, -2.2]
        : wasSeated
          ? [0.5, 0, 0.5]
          : i === 0
            ? [0.5, 0, 0]
            : [1.5, 0, 0.5],
      startRotation: wasSleeping
        ? [1.4, 0, 0]
        : [0, Math.PI, 0],
    }
  })

  if (text.includes('gold') || text.includes('jewel') || text.includes('jewellery') || text.includes('necklace'))
    result.itemsStolen.push('GOLD')
  if (text.includes('phone') || text.includes('mobile') || text.includes('iphone'))
    result.itemsStolen.push('PHONE')
  if (text.includes('laptop') || text.includes('computer')) result.itemsStolen.push('LAPTOP')
  if (text.includes('cash') || text.includes('money') || text.includes('wallet'))
    result.itemsStolen.push('CASH')
  if (text.includes('car') || text.includes('vehicle') || text.includes('bike'))
    result.itemsStolen.push('VEHICLE')
  if (text.includes('bag') || text.includes('purse') || text.includes('handbag'))
    result.itemsStolen.push('BAG')

  if (
    text.includes('gun') ||
    text.includes('shot') ||
    text.includes('fired') ||
    text.includes('pistol') ||
    text.includes('bullet') ||
    text.includes('firearm')
  ) {
    result.weaponDetails.type = 'FIREARM'
  } else if (
    text.includes('knife') ||
    text.includes('stab') ||
    text.includes('blade') ||
    text.includes('cut')
  ) {
    result.weaponDetails.type = 'KNIFE'
  } else if (
    text.includes('rod') ||
    text.includes('bat') ||
    text.includes('stick') ||
    text.includes('hit with') ||
    text.includes('beat') ||
    text.includes('blunt')
  ) {
    result.weaponDetails.type = 'BLUNT'
  } else if (text.includes('strangle') || text.includes('choke') || text.includes('throttle')) {
    result.weaponDetails.type = 'HANDS'
  } else if (text.includes('acid')) {
    result.weaponDetails.type = 'ACID'
  } else {
    const wt = (caseData.weaponType || 'None').toUpperCase()
    if (wt.includes('FIRE')) result.weaponDetails.type = 'FIREARM'
    else if (wt.includes('KNIFE')) result.weaponDetails.type = 'KNIFE'
    else if (wt.includes('BLUNT')) result.weaponDetails.type = 'BLUNT'
    else if (caseData.weaponPresent === 'Yes') result.weaponDetails.type = 'FIREARM'
    else result.weaponDetails.type = 'NONE'
  }

  if (text.includes('north') || text.includes('ran away') || text.includes('fled north'))
    result.escapedNorth = true
  if (text.includes('fled') || text.includes('escaped') || text.includes('ran'))
    result.escapedNorth = result.escapedNorth || text.includes('away')
  if (text.includes('car') && (text.includes('drove') || text.includes('escaped by')))
    result.escapedByCar = true
  if (text.includes('bike') || text.includes('motorcycle')) result.escapedByBike = true

  const timeMatch = text.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/)
  if (timeMatch) result.crimeTime = timeMatch[0]

  if (
    text.includes('witness') ||
    text.includes('neighbour') ||
    text.includes('neighbor') ||
    text.includes('bystander') ||
    text.includes('security guard')
  ) {
    result.hasWitness = true
  }

  if (text.includes('argument') || text.includes('shout') || text.includes('yell'))
    result.hasArgument = true

  return result
}

export function weaponTypeToKey(type) {
  const map = {
    FIREARM: 'Firearm',
    KNIFE: 'Knife',
    BLUNT: 'Blunt Object',
    HANDS: 'None',
    ACID: 'Acid',
    NONE: 'None',
  }
  return map[type] || 'None'
}

export function suspectShirtColor(clothing) {
  if (clothing === 'black') return '#1a1a1a'
  if (clothing === 'white') return '#e8e8e8'
  if (clothing === 'hoodie') return '#222233'
  return '#1a1a22'
}
