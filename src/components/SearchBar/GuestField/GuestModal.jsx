import GuestCounter from './GuestCounter'

const GUEST_TYPES = [
  { key: 'adults',   label: '성인',   description: '13세 이상' },
  { key: 'children', label: '어린이', description: '2~12세' },
  { key: 'infants',  label: '유아',   description: '2세 미만' },
  { key: 'pets',     label: '반려동물', description: '', extra: '보조동물을 동반하시나요?' },
]

export default function GuestModal({ guests, onChange }) {
  const handleChange = (key, delta) => {
    onChange(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }))
  }

  return (
    <div className="absolute top-[calc(100%+12px)] right-0 bg-white rounded-3xl shadow-xl p-6 w-80 z-50">
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
