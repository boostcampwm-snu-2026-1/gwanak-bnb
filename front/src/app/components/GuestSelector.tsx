"use client"

interface GuestSelectorProps {
  adults: number
  children: number
  infants: number
  onAdultsChange: (value: number) => void
  onChildrenChange: (value: number) => void
  onInfantsChange: (value: number) => void
}

interface CounterProps {
  label: string
  description: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

function Counter({ label, description, value, onChange, min = 0, max = 16 }: CounterProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="font-medium text-[#222]">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => value > min && onChange(value - 1)}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label={`${label} 감소`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <span className="w-6 text-center">{value}</span>
        <button
          type="button"
          onClick={() => value < max && onChange(value + 1)}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label={`${label} 증가`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function GuestSelector({
  adults,
  children,
  infants,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
}: GuestSelectorProps) {
  return (
    <div className="divide-y divide-gray-200">
      <Counter label="성인" description="13세 이상" value={adults} onChange={onAdultsChange} />
      <Counter label="어린이" description="2~12세" value={children} onChange={onChildrenChange} />
      <Counter label="유아" description="2세 미만" value={infants} onChange={onInfantsChange} max={5} />
    </div>
  )
}
