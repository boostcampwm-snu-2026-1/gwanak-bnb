function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="p-8 bg-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Tailwind + Vite 성공!
        </h1>
        <p className="mt-4 text-gray-600">
          이제 클래스명만으로 스타일을 입힐 수 있습니다.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800">
          확인 완료
        </button>
      </div>
    </div>
  );
}

export default App;
