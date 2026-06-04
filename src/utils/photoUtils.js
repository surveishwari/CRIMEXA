export function getPhotoBrightness(photoUrl) {
  if (!photoUrl) return Promise.resolve(128)
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const w = Math.min(img.width, 64)
        const h = Math.min(img.height, 64)
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        const data = ctx.getImageData(0, 0, w, h).data
        let sum = 0
        for (let i = 0; i < data.length; i += 4) {
          sum += (data[i] + data[i + 1] + data[i + 2]) / 3
        }
        resolve(sum / (data.length / 4))
      } catch {
        resolve(128)
      }
    }
    img.onerror = () => resolve(128)
    img.src = photoUrl
  })
}

import { useCaseStore } from '../store/caseStore'

export function addScenePhotoToStore(dataUrl) {
  const s = useCaseStore.getState()
  const scenePhotos = [...(s.scenePhotos || []), dataUrl]
  useCaseStore.setState({
    scenePhotos,
    primaryScenePhoto: s.primaryScenePhoto || dataUrl,
  })
  getPhotoBrightness(dataUrl).then((brightness) => {
    useCaseStore.getState().updateField('photoBrightness', brightness)
  })
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
