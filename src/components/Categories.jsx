import { useState } from 'react';
import './Categories.css';

const CATEGORIES = [
  { label: '한옥', icon: '🏠' },
  { label: '해변 근처', icon: '🏖️' },
  { label: '최고의 전망', icon: '🏔️' },
  { label: '디자인', icon: '🎨' },
  { label: '한적한 시골', icon: '🌾' },
  { label: '캠핑장', icon: '⛺' },
  { label: '수영장', icon: '🏊' },
  { label: '섬', icon: '🏝️' },
  { label: '호수', icon: '🌊' },
  { label: '통나무집', icon: '🪵' },
  { label: '성', icon: '🏰' },
  { label: '트리하우스', icon: '🌳' },
];

export default function Categories() {
  const [active, setActive] = useState(0);

  return (
    <div className="categories">
      <div className="categories-scroll">
        {CATEGORIES.map(({ label, icon }, i) => (
          <button
            key={label}
            className={`category-item ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="category-icon">{icon}</span>
            <span className="category-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
