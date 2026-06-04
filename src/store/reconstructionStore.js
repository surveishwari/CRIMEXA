import { create } from 'zustand'

export const useReconstructionStore = create((set) => ({
  currentAct: 0,
  isPlaying: false,
  progress: 0,
  playbackSpeed: 1,

  setAct: (actIndex) => set({ currentAct: actIndex }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setProgress: (prog) => set({ progress: prog }),
  setSpeed: (speed) => set({ playbackSpeed: speed }),

  reset: () =>
    set({ currentAct: 0, isPlaying: false, progress: 0, playbackSpeed: 1 }),
}))

export const useCrimeStore = create((set) => ({
  predictedCrime: 'MURDER',
  confidence: 97.9,
  caseId: 'CPD-047',
  caseType: 'Homicide',
  weaponPresent: 'Yes',
  weaponType: 'Firearm',
  entryMethod: 'Forced Door',
  numberOfVictims: 1,
  crimeTime: '22:00',
  crimeLocation: 'District 12 — Office',
  crimeDate: 'Tuesday',
  evidenceItems: ['Firearm', 'Laptop', 'Blood Sample'],
  suspectCount: 1,
  victimCount: 1,
  timeOfCrime: '22:00',

  setCrimeData: (data) => set((state) => ({ ...state, ...data })),
  setPredictedCrime: (crime) => set({ predictedCrime: crime }),
}))
