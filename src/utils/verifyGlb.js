/**
 * Vite SPA fallback returns index.html (200) for missing files.
 * HEAD requests are unreliable — verify GLB magic bytes instead.
 */
export async function isValidGlbUrl(url) {
  try {
    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) return false

    const contentType = (res.headers.get('content-type') || '').toLowerCase()
    if (contentType.includes('text/html') || contentType.includes('text/plain')) {
      return false
    }

    const buffer = await res.arrayBuffer()
    if (buffer.byteLength < 12) return false

    const magic = new TextDecoder().decode(new Uint8Array(buffer, 0, 4))
    return magic === 'glTF'
  } catch {
    return false
  }
}
