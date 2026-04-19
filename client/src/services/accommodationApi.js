const apiBaseUrl = (
  import.meta.env.SERVER_URL || 'http://localhost:3000'
).replace(/\/$/, '')

export async function fetchAccommodations(params) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      return
    }

    searchParams.set(key, String(value))
  })

  const response = await fetch(
    `${apiBaseUrl}/api/accommodations?${searchParams.toString()}`,
  )
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || '검색 결과를 불러오지 못했습니다.')
  }

  return result
}

export default {
  fetchAccommodations,
}
