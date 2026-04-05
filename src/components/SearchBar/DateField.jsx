// 날짜 탭 컴포넌트
// 현재는 UI 표시 전용이며, 달력/날짜 선택 기능은 구현되어 있지 않다
// 호버 이벤트는 부모(SearchBar)에서 관리하며 props로 전달받는다

export default function DateField({ onMouseEnter, onMouseLeave }) {
  return (
    // 호버 시 SearchBar에서 회색 하이라이트 처리를 위해 이벤트를 부모로 전달
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex flex-col px-6 justify-center h-full"
    >
      {/* 탭 레이블 */}
      <span className="text-xs font-semibold text-gray-900">날짜</span>
      {/* 플레이스홀더 텍스트 */}
      <span className="text-sm text-gray-400 mt-0.5">날짜 추가</span>
    </div>
  )
}
