export type GuestCounts = {
  adults: number
  children: number
  infants: number
  pets: number
}

export function formatGuestSummary(g: GuestCounts): string {
  const isDefault =
    g.adults === 0 && g.children === 0 && g.infants === 0 && g.pets === 0
  if (isDefault) return '게스트 추가'

  const parts: string[] = []
  const totalPeople = g.adults + g.children
  if (totalPeople > 0) {
    parts.push(`게스트 ${totalPeople}명`)
  }
  if (g.infants > 0) {
    parts.push(`유아 ${g.infants}명`)
  }
  if (g.pets > 0) {
    parts.push(
      g.pets === 1 ? '반려동물 1마리' : `반려동물 ${g.pets}마리`,
    )
  }
  if (parts.length === 0) return '게스트 추가'
  return parts.join(', ')
}
