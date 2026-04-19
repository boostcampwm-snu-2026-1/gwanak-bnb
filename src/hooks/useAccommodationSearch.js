import { useState } from 'react'
import { API_BASE_URL } from '../config/api'

export function useAccommodationSearch() {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = async (destination, guests, checkin, checkout) => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ destination, guests })
      if (checkin) params.append('checkin', checkin)
      if (checkout) params.append('checkout', checkout)

      const res = await fetch(`${API_BASE_URL}/api/accommodations/search?${params}`)
      const json = await res.json()

      if (!json.success) {
        setError(json.message || '검색에 실패했습니다.')
        setResults([])
      } else {
        setResults(json.data)
      }
    } catch {
      setError('서버에 연결할 수 없습니다.')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return { results, isLoading, error, search }
}
