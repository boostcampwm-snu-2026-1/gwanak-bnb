import GuestSelector from './components/Guest/GuestSelector'
import DestinationSelector from './components/Destination/DestinationSelector';


function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-black text-rose-500 tracking-tighter">관악BNB</h1>
      </header>
      
      <main className="w-full max-w-5xl">
        <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-md p-2 hover:shadow-lg transition-shadow mx-auto w-full max-w-[850px]">
          {/* 목적지 선택 */}
          <div className="flex-[1.5]"> 
            <DestinationSelector />
          </div>

          <div className="h-8 w-[1px] bg-gray-200" /> {/* 구분선 */}

          {/* 날짜 선택 */}
          <div className="flex-1 px-8 py-3 cursor-pointer hover:bg-gray-100 rounded-full transition-colors whitespace-nowrap">
            <div className="text-[10px] font-extrabold uppercase">날짜</div>
            <div className="text-sm text-gray-500 font-medium">날짜 추가</div>
          </div>

          <div className="h-8 w-[1px] bg-gray-200" /> {/* 구분선 */}

          {/* 인원 선택 */}
          <div className="flex-1">
            <GuestSelector />
          </div>

          {/* 검색 버튼 */}
          <button className="bg-rose-500 text-white p-4 rounded-full ml-2 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;