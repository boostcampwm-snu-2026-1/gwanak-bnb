import type { ListingSummary } from '../../api/listings'
import { ListingCard } from './ListingCard'
import './SearchResultsSection.css'

export type SearchUiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; listings: ListingSummary[] }
  | { status: 'error'; message: string }

export type SearchResultsSectionProps = {
  state: SearchUiState
  validationMessage: string | null
}

export function SearchResultsSection({
  state,
  validationMessage,
}: SearchResultsSectionProps) {
  const showValidation = validationMessage != null && validationMessage !== ''

  const showIdleHint =
    !showValidation && state.status === 'idle'

  return (
    <section
      className="search-results-section"
      aria-labelledby="search-results-heading"
    >
      <h2 id="search-results-heading" className="search-results-heading">
        검색 결과
      </h2>

      {showValidation ? (
        <p className="search-results-validation" role="status">
          {validationMessage}
        </p>
      ) : null}

      {showIdleHint ? (
        <p className="search-results-hint">
          여행지와 인원을 선택한 뒤 검색하면 이곳에 숙소 목록이 표시됩니다.
        </p>
      ) : null}

      {state.status === 'loading' ? (
        <p className="search-results-loading" role="status">
          불러오는 중…
        </p>
      ) : null}

      {state.status === 'error' ? (
        <p className="search-results-error" role="alert">
          {state.message}
        </p>
      ) : null}

      {state.status === 'success' && state.listings.length === 0 ? (
        <p className="search-results-empty">조건에 맞는 숙소가 없습니다.</p>
      ) : null}

      {state.status === 'success' && state.listings.length > 0 ? (
        <ul className="search-results-list">
          {state.listings.map((listing) => (
            <li key={listing.id} className="search-results-item">
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
