import 'dotenv/config'

const portRaw = process.env.PORT
export const PORT = portRaw ? Number.parseInt(portRaw, 10) : 3000

export const MONGODB_URI = process.env.MONGODB_URI ?? ''

/** CORS: comma-separated origins, or * for dev */
export function getCorsOrigins(): string[] | true {
  const raw = process.env.CORS_ORIGIN ?? ''
  if (raw.trim() === '' || raw.trim() === '*') {
    return true
  }
  return raw.split(',').map((s) => s.trim()).filter(Boolean)
}
