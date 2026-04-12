import GuestSelector from './components/GuestSelector'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-rose-500 tracking-tighter">관악BNB</h1>
      </header>
      
      <main className="w-full flex justify-center">
        <GuestSelector />
      </main>
    </div>
  );
}

export default App