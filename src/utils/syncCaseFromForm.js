import { useCaseStore } from '../store/caseStore'
import {
  deriveLocationType,
  normalizeEntryMethod,
  deriveDetectedFromNarrative,
  getDayOfWeek,
} from './caseDataUtils'
import { determineCrimeType } from './determineCrimeType'
import { resolveEnvironment } from './resolveEnvironment'

export function syncCaseFromForm(formData, witnesses = [], caseId = '') {
  const weaponPresent = formData.weapon ? 'Yes' : 'No'
  const weaponType = formData.weapon ? formData.weaponType : 'None'
  const entryMethod = normalizeEntryMethod(formData.entry)
  const officerNarrative = [formData.desc, ...witnesses.filter(Boolean)].join('\n')
  const detectedObjects = deriveDetectedFromNarrative(officerNarrative, weaponPresent)

  const formLocMap = {
    'Residence-House': 'HOUSE',
    Apartment: 'APARTMENT',
    Street: 'STREET',
    Vehicle: 'PARKING_LOT',
  }
  const fromFormLoc = formLocMap[formData.locationType]

  const payload = {
    caseId: caseId || 'NEW',
    caseTitle: formData.title,
    caseType: formData.type,
    priorityLevel: formData.priority,
    address: formData.address,
    entryMethod,
    weaponPresent,
    weaponType,
    numberOfSuspects: Number(formData.suspects) || 1,
    numberOfVictims: Number(formData.victims) || 0,
    officerNarrative,
    witnessStatements: witnesses,
    timeOfCrime: formData.time || '22:00',
    incidentDate: formData.date,
    dayOfWeek: getDayOfWeek(formData.date),
    indoor: formData.indoor,
    detectedObjects,
    locationType: resolveEnvironment(
      fromFormLoc ||
        deriveLocationType({
          address: formData.address,
          caseType: formData.type,
          entryMethod,
        }),
      formData.address
    ),
    predictedCrime: determineCrimeType({
      caseType: formData.type,
      entryMethod,
      weaponPresent,
      weaponType,
      numberOfVictims: Number(formData.victims) || 0,
      body_detected: Number(formData.victims) > 0,
    }),
  }

  useCaseStore.getState().setCase(payload)
  return payload
}

export function bindFormField(setFormData, fieldName, value, formData, witnesses, caseId) {
  const next = { ...formData, [fieldName]: value }
  setFormData(next)
  syncCaseFromForm(next, witnesses, caseId)
}
