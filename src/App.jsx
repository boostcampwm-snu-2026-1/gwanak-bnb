import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <SearchBar />
      </main>
    </div>
  )
}

export default App
