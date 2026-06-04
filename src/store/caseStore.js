import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { deriveLocationType } from '../utils/caseDataUtils'

const initialState = {
  caseId: '',
  caseTitle: '',
  caseType: '',
  priorityLevel: '',
  address: '',
  locationCoords: null,
  entryMethod: '',
  weaponPresent: '',
  weaponType: '',
  numberOfSuspects: 1,
  numberOfVictims: 1,
  officerNarrative: '',
  witnessStatements: [],
  detectedObjects: [],
  predictedCrime: '',
  mlConfidence: 0,
  riskLevel: '',
  locationType: '',
  timeOfCrime: '',
  incidentDate: '',
  dayOfWeek: '',
  indoor: true,
  scenePhotos: [],
  primaryScenePhoto: null,
  photoBrightness: null,
}

const generateCaseId = () => `CASE-${Date.now()}-${Math.floor(Math.random() * 1000)}`

export const useCaseStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setCase: (data) =>
        set((state) => {
          const next = { ...state, ...data }
          if (data.address !== undefined || data.caseType !== undefined || data.entryMethod !== undefined) {
            next.locationType =
              data.locationType ||
              deriveLocationType({
                address: next.address,
                caseType: next.caseType,
                entryMethod: next.entryMethod,
              })
          }
          return next
        }),

      updateField: (key, value) =>
        set((state) => {
          const next = { ...state, [key]: value }
          if (['address', 'caseType', 'entryMethod'].includes(key)) {
            next.locationType = deriveLocationType({
              address: next.address,
              caseType: next.caseType,
              entryMethod: next.entryMethod,
            })
          }
          return next
        }),

      updateActiveCase: (data) =>
        set((state) => {
          const next = { ...state, ...data }
          if (data.address !== undefined || data.caseType !== undefined || data.entryMethod !== undefined) {
            next.locationType =
              data.locationType ||
              deriveLocationType({
                address: next.address,
                caseType: next.caseType,
                entryMethod: next.entryMethod,
              })
          }
          return next
        }),

      createNewCase: () => {
        set({
          ...initialState,
          caseId: generateCaseId(),
          createdAt: new Date().toISOString(),
          status: 'DRAFT',
        })
      },

      saveDraft: () => {
        try {
          get()
          return true
        } catch (error) {
          console.error('Failed to save draft', error)
          return false
        }
      },

      hasCaseLoaded: () => {
        const s = get()
        return Boolean(s.caseId?.trim() && s.caseTitle?.trim())
      },

      resetCase: () => set({ ...initialState }),
    }),
    { name: 'crimevr-case-store' }
  )
)
