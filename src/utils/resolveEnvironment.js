/** Resolve procedural 3D environment type from case store fields */
export function resolveEnvironment(locationType, address) {
  const a = (address || '').toLowerCase()
  const lt = (locationType || '').toUpperCase()

  if (
    a.includes('road') ||
    a.includes('street') ||
    a.includes('marg') ||
    a.includes('naka') ||
    a.includes('chowk') ||
    a.includes('lane') ||
    a.includes('ave') ||
    lt === 'STREET'
  )
    return 'STREET'

  if (a.includes('alley') || a.includes('gali') || a.includes('passage') || lt === 'ALLEY')
    return 'ALLEY'

  if (
    a.includes('office') ||
    a.includes('corporate') ||
    a.includes('tower') ||
    lt === 'OFFICE'
  )
    return 'OFFICE'

  if (
    a.includes('shop') ||
    a.includes('store') ||
    a.includes('mall') ||
    a.includes('market') ||
    a.includes('bazaar') ||
    a.includes('grocery') ||
    lt === 'STORE'
  )
    return 'STORE'

  if (a.includes('parking') || a.includes('lot') || lt === 'PARKING_LOT') return 'PARKING_LOT'

  if (a.includes('warehouse') || a.includes('godown') || lt === 'WAREHOUSE') return 'WAREHOUSE'

  if (lt === 'APARTMENT' || a.includes('apartment') || a.includes('flat') || a.includes('apt'))
    return 'APARTMENT'

  return 'HOUSE'
}

export function isOutdoorEnv(envType) {
  return ['STREET', 'ALLEY', 'PARKING_LOT'].includes(envType)
}
