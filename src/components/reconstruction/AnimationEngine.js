import gsap from 'gsap'

export function timelineDone(tl) {
  return new Promise((resolve) => {
    tl.eventCallback('onComplete', resolve)
  })
}

export const ANIMATIONS = {
  idle(refs) {
    if (!refs?.torso?.scale) return
    gsap.to(refs.torso.scale, {
      y: 1.015,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  },

  walkTo(refs, toX, toZ, duration = 2.5) {
    const tl = gsap.timeline()
    const repeats = Math.max(1, Math.floor(duration / 0.35))
    tl.to(refs.root.position, { x: toX, z: toZ, duration, ease: 'power1.inOut' })
    tl.to(
      refs.lThigh.rotation,
      { x: 0.55, duration: 0.35, repeat: repeats, yoyo: true },
      0
    )
    tl.to(
      refs.rThigh.rotation,
      { x: 0.55, duration: 0.35, repeat: repeats, yoyo: true, delay: 0.175 },
      0
    )
    tl.to(
      refs.rUpperArm.rotation,
      { x: -0.5, duration: 0.35, repeat: repeats, yoyo: true },
      0
    )
    tl.to(
      refs.lUpperArm.rotation,
      { x: -0.5, duration: 0.35, repeat: repeats, yoyo: true, delay: 0.175 },
      0
    )
    return tl
  },

  raiseWeapon(refs) {
    const tl = gsap.timeline()
    tl.to(refs.rUpperArm.rotation, { x: -1.35, duration: 0.5 })
    tl.to(refs.rForearm.rotation, { x: -0.25, duration: 0.3 }, '-=0.2')
    tl.to(refs.torso.rotation, { y: -0.2, duration: 0.3 }, 0)
    return tl
  },

  backAway(refs) {
    return gsap.to(refs.root.position, {
      z: refs.root.position.z + 1.4,
      duration: 1.0,
      ease: 'power1.out',
    })
  },

  victimFall(refs) {
    const tl = gsap.timeline()
    tl.to(refs.root.rotation, { x: 1.35, duration: 0.7, ease: 'power2.in' })
    tl.to(refs.root.position, { y: -0.6, duration: 0.7, ease: 'power2.in' }, 0)
    tl.to(refs.lUpperArm.rotation, { z: 0.9, duration: 0.5 }, 0)
    tl.to(refs.rUpperArm.rotation, { z: -0.9, duration: 0.5 }, 0)
    tl.to(refs.lThigh.rotation, { x: 0.3, duration: 0.4 }, 0.2)
    tl.to(refs.rThigh.rotation, { x: -0.15, z: 0.2, duration: 0.4 }, 0.2)
    return tl
  },

  slumped(refs) {
    gsap.set(refs.root.rotation, { x: 1.35 })
    gsap.set(refs.root.position, { y: -0.6 })
    gsap.set(refs.torso.rotation, { x: 0.3 })
    gsap.set(refs.head.rotation, { x: 0.4 })
    gsap.set(refs.lUpperArm.rotation, { z: 0.7, x: 0.2 })
    gsap.set(refs.rUpperArm.rotation, { z: -0.7, x: 0.2 })
  },

  run(refs, toX, toZ) {
    const tl = gsap.timeline()
    tl.to(refs.root.position, { x: toX, z: toZ, duration: 1.0, ease: 'power2.in' })
    tl.to(refs.lThigh.rotation, { x: 0.9, duration: 0.2, repeat: 5, yoyo: true }, 0)
    tl.to(
      refs.rThigh.rotation,
      { x: 0.9, duration: 0.2, repeat: 5, yoyo: true, delay: 0.1 },
      0
    )
    tl.to(refs.torso.rotation, { x: -0.2, duration: 0.2 }, 0)
    return tl
  },

  grabItem(refs) {
    const tl = gsap.timeline()
    tl.to(refs.torso.rotation, { x: -0.3, duration: 0.4 })
    tl.to(refs.rUpperArm.rotation, { x: -0.9, duration: 0.4 }, 0)
    tl.to(refs.rForearm.rotation, { x: -0.7, duration: 0.3 }, '-=0.1')
    tl.to(refs.rUpperArm.rotation, { x: -0.3, duration: 0.5 }, '+=0.3')
    tl.to(refs.torso.rotation, { x: 0, duration: 0.4 }, '-=0.3')
    return tl
  },
}
