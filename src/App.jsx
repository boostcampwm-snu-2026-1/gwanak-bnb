// 루트 컴포넌트
// 전체 페이지 레이아웃을 구성하고 SearchBar를 화면 중앙에 배치한다

import SearchBar from './components/SearchBar/SearchBar'

function App() {
  return (
    // 전체 화면을 flexbox로 수직/수평 중앙 정렬
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <SearchBar />
    </div>
  )
}

export default App
