import { AudioManager } from './audioManager'

const sounds = {
  door: new Audio('/sounds/door-creak.mp3'),
  gunshot: new Audio('/sounds/gunshot.mp3'),
  fall: new Audio('/sounds/body-fall.mp3'),
  footsteps: new Audio('/sounds/footsteps.mp3'),
  ambient: new Audio('/sounds/ambient-night.mp3'),
  glass: new Audio('/sounds/glass-break.mp3'),
}

Object.values(sounds).forEach((s) => {
  s.volume = 0.4
})
sounds.ambient.loop = true

let audioReady = false

export function initReconstructionAudio() {
  if (audioReady) return
  sounds.ambient.play().catch(() => {})
  audioReady = true
}

export function playReconstructionSound(name) {
  const s = sounds[name]
  if (!s) {
    const synthMap = {
      door: 'door_creak.mp3',
      gunshot: 'weapon_highlight',
      fall: 'body_fall.mp3',
      footsteps: 'indoor',
      glass: 'glass_break.mp3',
    }
    AudioManager.play(synthMap[name] || name, 0.45)
    return
  }
  s.currentTime = 0
  s.play().catch(() => {
    const synthMap = {
      door: 'door_creak.mp3',
      gunshot: 'weapon_highlight',
      fall: 'body_fall.mp3',
      glass: 'glass_break.mp3',
    }
    AudioManager.play(synthMap[name] || 'indoor', 0.45)
  })
}

export function stopAmbient() {
  sounds.ambient.pause()
}
