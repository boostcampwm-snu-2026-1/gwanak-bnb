import { useState, useRef, useEffect } from "react"
import LocationDropdown from "./LocationDropdown"

function SearchLocation() {
  const [keyword, setKeyword] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e) => {
    if (!isOpen) return
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % 5)
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev - 1 + 5) % 5)
    }
  }

  return (
    <div ref={containerRef} className="relative flex flex-col px-6 py-2 rounded-full hover:bg-gray-100 cursor-pointer">
      <span className="text-xs font-semibold">여행지</span>
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value)
          setSelectedIndex(-1)
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder="여행지 검색"
        className="text-sm text-gray-400 outline-none bg-transparent cursor-pointer"
      />
      {isOpen && (
        <LocationDropdown
          keyword={keyword}
          selectedIndex={selectedIndex}
          onSelect={(value) => {
            setKeyword(value)
            setIsOpen(false)
            setSelectedIndex(-1)
          }}
        />
      )}
    </div>
  )
}

export default SearchLocation