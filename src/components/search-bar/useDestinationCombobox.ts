import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  RefObject,
} from 'react'
import {
  DESTINATION_CATALOG,
  filterDestinations,
  getDefaultSuggestions,
} from '../../data/destinations'
import type { Destination } from '../../data/destinations'

function navigationHighlightIndex(
  highlightIndex: number,
  suggestionCount: number,
): number {
  if (suggestionCount === 0) return -1
  if (highlightIndex < 0) return -1
  return Math.min(highlightIndex, suggestionCount - 1)
}

const catalogById = new Map(DESTINATION_CATALOG.map((d) => [d.id, d]))

function formatCommittedInputLine(id: string): string {
  const d = catalogById.get(id)
  if (!d) return ''
  if (d.subtitle) return `${d.label}, ${d.subtitle}`
  return d.label
}

export type UseDestinationComboboxOptions = {
  committedDestinationId: string | null
  onCommittedDestinationIdChange: (id: string | null) => void
}

export type UseDestinationComboboxResult = {
  barRef: RefObject<HTMLDivElement | null>
  panelRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLInputElement | null>
  kickerId: string
  listboxId: string
  comboboxId: string
  sectionTitleId: string
  describedById: string
  isOpen: boolean
  inputValue: string
  activeOptionId: string | undefined
  suggestions: Destination[]
  highlightIndex: number
  layerPanelTitle: string | null
  emptyMessage: boolean
  openLayer: () => void
  handleQueryChange: (value: string) => void
  handleInputKeyDown: (e: ReactKeyboardEvent<HTMLInputElement>) => void
  handleBarMouseDown: (e: ReactMouseEvent<HTMLDivElement>) => void
  getOptionId: (index: number) => string
  handlePick: (index: number) => void
  setItemRef: (index: number, el: HTMLDivElement | null) => void
}

export function useDestinationCombobox(
  options: UseDestinationComboboxOptions,
): UseDestinationComboboxResult {
  const { committedDestinationId, onCommittedDestinationIdChange } = options

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const barRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const baseId = useId()
  const kickerId = `${baseId}-kicker`
  const listboxId = `${baseId}-listbox`
  const comboboxId = `${baseId}-combobox`
  const sectionTitleId = `${baseId}-section-title`
  const describedById = `${baseId}-query-desc`

  const suggestions = useMemo(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      return getDefaultSuggestions()
    }
    return filterDestinations(query)
  }, [query])

  const navIndex = navigationHighlightIndex(highlightIndex, suggestions.length)

  const panelTitle = useMemo(() => {
    if (query.trim() === '') return '추천 여행지'
    return '검색 결과'
  }, [query])

  const inputValue = useMemo(() => {
    if (isOpen) return query
    if (committedDestinationId)
      return formatCommittedInputLine(committedDestinationId)
    return query
  }, [isOpen, committedDestinationId, query])

  const setItemRef = useCallback((index: number, el: HTMLDivElement | null) => {
    const map = itemRefs.current
    if (el) map.set(index, el)
    else map.delete(index)
  }, [])

  const getOptionId = useCallback(
    (index: number) => `${listboxId}-option-${index}`,
    [listboxId],
  )

  const activeOptionId =
    navIndex >= 0 && suggestions.length > 0 ? getOptionId(navIndex) : undefined

  const emptyMessage = query.trim() !== '' && suggestions.length === 0
  const layerPanelTitle = emptyMessage ? '검색 결과' : panelTitle

  const openLayer = useCallback(() => {
    setIsOpen(true)
    if (committedDestinationId) {
      const d = catalogById.get(committedDestinationId)
      if (d) setQuery(d.label)
    }
    setHighlightIndex(-1)
  }, [committedDestinationId])

  useEffect(() => {
    if (!isOpen) return
    inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (panelRef.current?.contains(t)) return
      if (barRef.current?.contains(t)) return
      setIsOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || navIndex < 0 || suggestions.length === 0) return
    const el = itemRefs.current.get(navIndex)
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [navIndex, isOpen, suggestions.length])

  const closeLayer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleQueryChange = useCallback(
    (value: string) => {
      onCommittedDestinationIdChange(null)
      setQuery(value)
      setHighlightIndex(-1)
    },
    [onCommittedDestinationIdChange],
  )

  const applyHighlight = useCallback(
    (nextIndex: number) => {
      const item = suggestions[nextIndex]
      if (!item) return
      setHighlightIndex(nextIndex)
      setQuery(item.label)
    },
    [suggestions],
  )

  const handlePick = useCallback(
    (index: number) => {
      const item = suggestions[index]
      if (!item) return
      onCommittedDestinationIdChange(item.id)
      setQuery(item.label)
      setHighlightIndex(index)
      closeLayer()
    },
    [suggestions, closeLayer, onCommittedDestinationIdChange],
  )

  const handleInputKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      const n = suggestions.length
      if (e.key === 'ArrowDown') {
        if (n === 0) return
        e.preventDefault()
        const base = navigationHighlightIndex(highlightIndex, n)
        const next = base < 0 ? 0 : (base + 1) % n
        applyHighlight(next)
        return
      }
      if (e.key === 'ArrowUp') {
        if (n === 0) return
        e.preventDefault()
        const base = navigationHighlightIndex(highlightIndex, n)
        const next = base < 0 ? n - 1 : (base - 1 + n) % n
        applyHighlight(next)
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const idx = navigationHighlightIndex(highlightIndex, n)
        if (idx >= 0 && suggestions[idx]) {
          onCommittedDestinationIdChange(suggestions[idx].id)
          setQuery(suggestions[idx].label)
        }
        closeLayer()
        return
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        closeLayer()
      }
    },
    [
      suggestions,
      highlightIndex,
      applyHighlight,
      closeLayer,
      onCommittedDestinationIdChange,
    ],
  )

  const handleBarMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement
    if (t.closest('input')) return
    e.preventDefault()
    inputRef.current?.focus()
  }, [])

  return {
    barRef,
    panelRef,
    inputRef,
    kickerId,
    listboxId,
    comboboxId,
    sectionTitleId,
    describedById,
    isOpen,
    inputValue,
    activeOptionId,
    suggestions,
    highlightIndex: navIndex,
    layerPanelTitle,
    emptyMessage,
    openLayer,
    handleQueryChange,
    handleInputKeyDown,
    handleBarMouseDown,
    getOptionId,
    handlePick,
    setItemRef,
  }
}
