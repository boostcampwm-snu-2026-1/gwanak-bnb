import { useState } from 'react';

function HeartIcon() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setLiked(!liked);
      }}
      style={{
        position: 'absolute',
        top: 12,
        right: 12,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
      aria-label="찜하기"
    >
      <svg
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill={liked ? '#ff385c' : 'rgba(0, 0, 0, 0.5)'}
        stroke="#fff"
        strokeWidth="2"
      >
        <path d="M16 28c7-4.7 12-9.2 12-14 0-4.4-3.6-8-8-8-2.4 0-4.5 1-6 2.7C12.5 7 10.4 6 8 6c-4.4 0-8 3.6-8 8 0 4.8 5 9.3 12 14l2 1.3 2-1.3z" />
      </svg>
    </button>
  );
}

export default HeartIcon;
