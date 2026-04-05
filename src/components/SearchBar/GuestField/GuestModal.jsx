// 인원 선택 드롭다운 모달 컴포넌트
// 여행자 탭 아래에 절대 위치로 표시되며, GuestCounter 목록을 렌더링한다

import GuestCounter from './GuestCounter'

// 카운터 목록 정의: key, 레이블, 설명, 선택적 링크 텍스트(extra)
// 배열로 관리해 카운터 추가/삭제를 선언적으로 처리
const GUEST_TYPES = [
  { key: 'adults',   label: '성인',     description: '13세 이상' },
  { key: 'children', label: '어린이',   description: '2~12세' },
  { key: 'infants',  label: '유아',     description: '2세 미만' },
  { key: 'pets',     label: '반려동물', description: '', extra: '보조동물을 동반하시나요?' },
]

// Props:
//   guests  - 현재 인원 객체 { adults, children, infants, pets }
//   onChange - 인원 상태 변경 함수 (GuestField의 setGuests)
export default function GuestModal({ guests, onChange }) {
  // handleChange: 특정 카테고리(key)의 인원을 delta만큼 증감
  // 0 미만으로 내려가지 않도록 Math.max(0, ...) 처리
  const handleChange = (key, delta) => {
    onChange(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }))
  }

  return (
    // 탭 버튼 바로 아래 우측 정렬로 표시 (top: 100% + 12px 여백)
    <div className="absolute top-[calc(100%+12px)] right-0 bg-white rounded-3xl shadow-xl p-6 w-80 z-50">
      {/* GUEST_TYPES 배열을 순회하며 각 카테고리의 카운터를 렌더링 */}
      {GUEST_TYPES.map(({ key, label, description, extra }) => (
        <GuestCounter
          key={key}
          label={label}
          description={description}
          extra={extra}
          count={guests[key]}
          onIncrease={() => handleChange(key, 1)}
          onDecrease={() => handleChange(key, -1)}
        />
      ))}
    </div>
  )
}
