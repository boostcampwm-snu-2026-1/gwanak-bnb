import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  const [count, setCount] = useState(0)

  return <main className="app">
    <SearchBar />
  </main>
}

export default App
