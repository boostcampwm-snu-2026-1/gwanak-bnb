import { useState } from 'react'
import Button from '../atoms/Button'

function CounterRow({ label, description, count, onDecrement, onIncrement, min = 0 }) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-200 last:border-0">
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onDecrement}
          disabled={count <= min}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${
            count <= min
              ? 'border-gray-200 text-gray-200 cursor-not-allowed'
              : 'border-gray-400 text-gray-600 hover:border-gray-800'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-6 text-center font-medium text-gray-800">{count}</span>
        <button
          onClick={onIncrement}
          className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center hover:border-gray-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function GuestSelectorModal({ isOpen, onClose, onConfirm }) {
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)

  if (!isOpen) return null

  const handleClear = () => {
    setAdults(0)
    setChildren(0)
    setInfants(0)
    setPets(0)
  }

  const handleConfirm = () => {
    onConfirm({ adults, children, infants, pets })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">여행자 선택</h2>
          <Button variant="icon" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        <CounterRow
          label="성인"
          description="만 13세 이상"
          count={adults}
          onDecrement={() => setAdults(a => Math.max(0, a - 1))}
          onIncrement={() => setAdults(a => a + 1)}
        />
        <CounterRow
          label="어린이"
          description="2~12세"
          count={children}
          onDecrement={() => setChildren(c => Math.max(0, c - 1))}
          onIncrement={() => setChildren(c => c + 1)}
        />
        <CounterRow
          label="유아"
          description="2세 미만"
          count={infants}
          onDecrement={() => setInfants(i => Math.max(0, i - 1))}
          onIncrement={() => setInfants(i => i + 1)}
        />
        <CounterRow
          label="반려동물"
          description="보조 동물을 동반하시나요?"
          count={pets}
          onDecrement={() => setPets(p => Math.max(0, p - 1))}
          onIncrement={() => setPets(p => p + 1)}
        />

        <div className="flex items-center justify-between mt-6 pt-4">
          <Button variant="ghost" size="sm" onClick={handleClear}>지우기</Button>
          <Button variant="primary" onClick={handleConfirm}>완료</Button>
        </div>
      </div>
    </div>
  )
}
