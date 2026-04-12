import SearchBarContainer from './components/SearchBarContainer.jsx'

function App() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 sm:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8">
          <p className="font-montserrat text-lg font-bold tracking-tight text-rose-500">
            gwanakbnb
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            어디로 떠나볼까요?
          </h1>

          <div className="mt-8 pb-2">
            <SearchBarContainer />
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
