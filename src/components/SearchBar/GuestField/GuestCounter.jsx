// 개별 인원 카운터 컴포넌트
// 카테고리 이름, 설명, 현재 인원 수와 증감 버튼을 표시한다
// 상태를 직접 보유하지 않고, 부모(GuestModal)로부터 count와 콜백을 받아 처리한다

// Props:
//   label       - 카테고리 이름 (예: '성인')
//   description - 나이 조건 설명 (예: '13세 이상')
//   count       - 현재 선택된 인원 수
//   onIncrease  - + 버튼 클릭 시 호출되는 콜백
//   onDecrease  - - 버튼 클릭 시 호출되는 콜백
//   extra       - (선택) 하단에 표시할 링크 텍스트 (반려동물 카테고리용)
export default function GuestCounter({ label, description, count, onIncrease, onDecrease, extra }) {
  return (
    // 각 카운터는 수평 레이아웃으로 구성, last:border-b-0으로 마지막 항목 구분선 제거
    <div className="flex items-center justify-between py-5 border-b border-gray-200 last:border-b-0">

      {/* 좌측: 카테고리 레이블과 설명 */}
      <div>
        <p className="font-medium text-gray-900 text-sm">{label}</p>
        <p className="text-gray-500 text-sm">{description}</p>
        {/* extra가 있을 때만 링크 텍스트 표시 (보조동물 안내) */}
        {extra && (
          <a href="#" className="text-gray-700 text-sm underline mt-0.5 block">
            {extra}
          </a>
        )}
      </div>

      {/* 우측: −/숫자/+ 컨트롤 */}
      <div className="flex items-center gap-3">
        {/* - 버튼: count가 0이면 비활성화 */}
        <button
          onClick={onDecrease}
          disabled={count === 0}
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-700 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">−</span>
        </button>

        {/* 현재 인원 수 */}
        <span className="w-5 text-center text-sm font-medium text-gray-900">{count}</span>

        {/* + 버튼 */}
        <button
          onClick={onIncrease}
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-700 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
        </button>
      </div>
    </div>
  )
}
