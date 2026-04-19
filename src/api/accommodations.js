const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function searchAccommodations({ location, guests }) {
  const params = new URLSearchParams()
  params.set('location', location)
  params.set('guests', String(guests))

  const response = await fetch(`${API_BASE_URL}/api/accommodations/search?${params.toString()}`)

  if (!response.ok) {
    const message = await safeReadMessage(response)
    throw new Error(message || `Request failed: ${response.status}`)
  }

  return response.json()
}

async function safeReadMessage(response) {
  try {
    const data = await response.json()
    return data.message
  } catch {
    return null
  }
}
