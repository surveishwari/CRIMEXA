export function parseNarrative(text) {
  const t = (text || '').toLowerCase()
  const result = {
    hasWitness: false,
    witnessPosition: [3, 0, 3],
    suspectFleeDirection: null,
    victimWasSeated: false,
    victimWasSleeping: false,
    altercationInKitchen: false,
    altercationInBedroom: false,
    victimStartPos: [0.5, 0, -0.5],
    victimStartRot: [0, Math.PI, 0],
  }

  if (
    t.includes('witness') ||
    t.includes('neighbour') ||
    t.includes('neighbor') ||
    t.includes('bystander') ||
    t.includes('security guard') ||
    t.includes('clerk')
  ) {
    result.hasWitness = true
    result.witnessPosition = [3.5, 0, 3.5]
  }

  if (t.includes('sleeping') || t.includes('asleep') || t.includes('in bed')) {
    result.victimWasSleeping = true
    result.victimStartPos = [-1.8, 0.35, -2.2]
    result.victimStartRot = [1.4, 0, 0]
  } else if (t.includes('sitting') || t.includes('seated') || t.includes('chair')) {
    result.victimWasSeated = true
    result.victimStartPos = [0, 0, 0.5]
    result.victimStartRot = [0, Math.PI, 0]
  }

  if (t.includes('north') || t.includes('fled north')) result.suspectFleeDirection = 'north'
  if (t.includes('south') || t.includes('fled south')) result.suspectFleeDirection = 'south'
  if (t.includes('ran') || t.includes('fled') || t.includes('escaped') || t.includes('flee'))
    result.suspectFleeDirection = result.suspectFleeDirection || 'away'

  if (t.includes('kitchen')) result.altercationInKitchen = true
  if (t.includes('bedroom') || t.includes('bed')) result.altercationInBedroom = true

  return result
}
