// 숙소 검색 API
// BE 미완성 시에는 MOCK_MODE=true로 더미 데이터를 반환한다

const MOCK_MODE = false

const MOCK_DATA = [
  { id: 1, name: '서울 종로 한옥 스테이', location: '서울', price: 85000, rating: 4.9, capacity: 2, color: 'from-orange-200 to-amber-100' },
  { id: 2, name: '서울 강남 모던 아파트', location: '서울', price: 120000, rating: 4.7, capacity: 4, color: 'from-blue-200 to-indigo-100' },
  { id: 3, name: '서울 홍대 코지 룸', location: '서울', price: 65000, rating: 4.5, capacity: 2, color: 'from-pink-200 to-rose-100' },
  { id: 4, name: '부산 해운대 오션뷰', location: '부산', price: 150000, rating: 4.8, capacity: 4, color: 'from-cyan-200 to-sky-100' },
  { id: 5, name: '부산 광안리 비치하우스', location: '부산', price: 95000, rating: 4.6, capacity: 3, color: 'from-teal-200 to-emerald-100' },
  { id: 6, name: '제주 협재 풀빌라', location: '제주', price: 280000, rating: 4.9, capacity: 6, color: 'from-green-200 to-lime-100' },
  { id: 7, name: '제주 성산 게스트하우스', location: '제주', price: 45000, rating: 4.4, capacity: 2, color: 'from-yellow-200 to-amber-100' },
  { id: 8, name: '강릉 경포 바다뷰 펜션', location: '강릉', price: 110000, rating: 4.7, capacity: 4, color: 'from-sky-200 to-blue-100' },
  { id: 9, name: '여수 돌산 리조트', location: '여수', price: 135000, rating: 4.6, capacity: 5, color: 'from-violet-200 to-purple-100' },
  { id: 10, name: '경주 황리단길 한옥', location: '경주', price: 90000, rating: 4.8, capacity: 2, color: 'from-red-200 to-orange-100' },
]

export async function searchAccommodations({ destination, guests }) {
  if (MOCK_MODE) {
    await new Promise(r => setTimeout(r, 600))
    return MOCK_DATA.filter(item =>
      item.location.includes(destination) && item.capacity >= guests
    )
  }

  const params = new URLSearchParams({ destination, guests })
  const res = await fetch(`/api/accommodations?${params}`)
  if (!res.ok) throw new Error('검색에 실패했습니다.')
  return res.json()
}
