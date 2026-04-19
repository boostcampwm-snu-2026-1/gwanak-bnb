import React from 'react';
import './SearchResults.css';

export default function SearchResults({ listings, location, totalGuests }) {
  if (!listings) return null;

  return (
    <div className="results-wrapper">
      {listings.length === 0 ? (
        <div className="results-empty">
          검색 결과가 없습니다.
        </div>
      ) : (
        <>
          <div className="results-header">
            {location}의 숙소 {listings.length}개
          </div>
          <div className="results-grid">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      <div className="listing-img-wrap">
        <img
          src={listing.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image'}
          alt={listing.name}
          className="listing-img"
        />
        {listing.badge && (
          <div className={`listing-badge${listing.badge === '슈퍼호스트' ? ' badge-super' : ''}`}>
            {listing.badge}
          </div>
        )}
        <button className="listing-wishlist" aria-label="찜하기">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="listing-info">
        <div className="listing-name-row">
          <span className="listing-name">{listing.name}</span>
          <span className="listing-rating">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="#222">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {listing.rating} ({listing.reviewCount})
          </span>
        </div>
        <div className="listing-sub">{listing.description}</div>
        <div className="listing-rooms">{listing.rooms}</div>
        <div className="listing-price">
          총액 <span>₩{listing.totalPrice?.toLocaleString()}</span>
        </div>
        <div className="listing-extra">{listing.extra}</div>
      </div>
    </div>
  );
}
