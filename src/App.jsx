import React, { useState, useEffect, useRef } from 'react';

const RECOMMENDATIONS = [
  {
    id: 1,
    name: '근처 체험 찾기',
    sub: '가까운 곳에서 즐길 수 있는 체험을 찾아보세요.',
    type: 'nearby',
    color: '#EBF3FF',
    iconColor: '#4A90D9',
  },
  {
    id: 2,
    name: '광안리해수욕장',
    sub: '해변으로 인기 있는 곳',
    type: 'beach',
    color: '#F5F0E8',
    iconColor: '#B8860B',
  },
  {
    id: 3,
    name: '오사카시, 일본',
    sub: '관광 명소: 오사카성',
    type: 'city',
    color: '#FFF0E8',
    iconColor: '#D4632A',
  },
  {
    id: 4,
    name: '부산, 부산',
    sub: '화려한 나이트라이프로 유명한 곳',
    type: 'temple',
    color: '#FFF0E8',
    iconColor: '#C0392B',
  },
  {
    id: 5,
    name: '제주',
    sub: '자연을 만끽하기 좋은 곳',
    type: 'statue',
    color: '#FFF0E8',
    iconColor: '#C0392B',
  },
  {
    id: 6,
    name: '속초시, 강원도',
    sub: '호수로 인기 있는 곳',
    type: 'lake',
    color: '#EBF3FF',
    iconColor: '#4A90D9',
  },
  {
    id: 7,
    name: '강릉시, 강원도',
    sub: '해변의 매력을 느낄 수 있는 곳',
    type: 'lake',
    color: '#EBF3FF',
    iconColor: '#4A90D9',
  },
  {
    id: 8,
    name: '후쿠오카시, 알본',
    sub: '관광 명소: 후쿠오카타워',
    type: 'lake',
    color: '#EBF3FF',
    iconColor: '#4A90D9',
  },
];

const SEARCH_DB = [
  { id: 101, name: '여수시', sub: '대한민국 · 전라남도 · 도시', type: 'pin' },
  { id: 102, name: '이순신광장', sub: '대한민국 · 전라남도 · 여수시 · 공원', type: 'pin' },
  { id: 103, name: '여수 베네치아호텔 앤 스위트', sub: '대한민국 · 전라남도 · 여수시 · 숙박시설', type: 'pin' },
  { id: 104, name: '여수시청', sub: '대한민국 · 전라남도 · 여수시', type: 'pin' },
  { id: 105, name: '운천동', sub: '대한민국 · 전라남도 · 지역', type: 'pin' },
  { id: 106, name: '강릉시, 강원도', sub: '대한민국 · 강원도 · 도시', type: 'pin' },
  { id: 107, name: '부산광역시', sub: '대한민국 · 부산 · 도시', type: 'pin' },
  { id: 108, name: '제주시', sub: '대한민국 · 제주특별자치도 · 도시', type: 'pin' },
];

function NearbyIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M12 4L14 9H19L15 12L17 17L12 14L7 17L9 12L5 9H10Z" fill={color} opacity="0.6"/>
    </svg>
  );
}

function CityIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="4" height="11" stroke={color} strokeWidth="1.4" rx="0.5"/>
      <rect x="10" y="6" width="4" height="15" stroke={color} strokeWidth="1.4" rx="0.5"/>
      <rect x="17" y="8" width="4" height="13" stroke={color} strokeWidth="1.4" rx="0.5"/>
      <path d="M2 21h20" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M6 6 L12 3 L18 5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function TempleIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L4 8h16L12 3z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <rect x="6" y="8" width="12" height="10" stroke={color} strokeWidth="1.4"/>
      <path d="M9 18V12h6v6" stroke={color} strokeWidth="1.4"/>
      <path d="M3 18h18" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M2 21h20" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function BeachIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="5" height="10" stroke={color} strokeWidth="1.4" rx="0.5"/>
      <rect x="10" y="4" width="5" height="14" stroke={color} strokeWidth="1.4" rx="0.5"/>
      <rect x="17" y="6" width="4" height="12" stroke={color} strokeWidth="1.4" rx="0.5"/>
      <path d="M2 19 Q6 17 12 19 Q18 21 22 19" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M2 21.5 Q6 19.5 12 21.5 Q18 23.5 22 21.5" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function LakeIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="4" height="12" stroke={color} strokeWidth="1.4" rx="0.5"/>
      <rect x="10" y="3" width="4" height="15" stroke={color} strokeWidth="1.4" rx="0.5"/>
      <rect x="16" y="5" width="4" height="13" stroke={color} strokeWidth="1.4" rx="0.5"/>
      <path d="M2 20 Q6 18 12 20 Q18 22 22 20" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M2 22.5 Q6 20.5 12 22.5 Q18 24.5 22 22.5" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

function StatueIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="5" rx="3" ry="3" stroke={color} strokeWidth="1.4"/>
      <path d="M9 8 Q8 12 9 16 Q10 18 12 18 Q14 18 15 16 Q16 12 15 8" stroke={color} strokeWidth="1.4" fill="none"/>
      <path d="M9 12 Q7 11 6 13" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M15 12 Q17 11 18 13" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M10 18 L9 21 M14 18 L15 21" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M7 21h10" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#222" strokeWidth="1.5"/>
      <circle cx="12" cy="9" r="2.5" stroke="#222" strokeWidth="1.5"/>
    </svg>
  );
}

function renderIcon(type, color) {
  switch (type) {
    case 'nearby': return <NearbyIcon color={color} />;
    case 'beach':  return <BeachIcon  color={color} />;
    case 'city':   return <CityIcon   color={color} />;
    case 'temple': return <TempleIcon color={color} />;
    case 'statue': return <StatueIcon color={color} />;
    case 'lake':   return <LakeIcon   color={color} />;
    default:       return <PinIcon />;
  }
}

function GuestRow({ title, desc, count, onMinus, onPlus, minusDisabled, isLink }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '24px 0',
      borderBottom: isLink ? 'none' : '1px solid #ebebeb',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#222', marginBottom: 4 }}>{title}</div>
        <div style={{
          fontSize: isLink ? 12 : 14, color: '#717171',
          textDecoration: isLink ? 'underline' : 'none',
          cursor: isLink ? 'pointer' : 'default',
        }}>{desc}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onMinus} disabled={minusDisabled} style={{
          width: 32, height: 32, borderRadius: '50%',
          border: `1px solid ${minusDisabled ? '#ebebeb' : '#b0b0b0'}`,
          background: '#fff', cursor: minusDisabled ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color: minusDisabled ? '#ebebeb' : '#717171',
        }}>－</button>
        <span style={{ fontSize: 16, color: '#222', minWidth: 25, textAlign: 'center' }}>{count}</span>
        <button onClick={onPlus} style={{
          width: 32, height: 32, borderRadius: '50%',
          border: '1px solid #b0b0b0', background: '#fff',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 18, color: '#717171',
        }}>＋</button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab]   = useState(null);
  const [hoverTab, setHoverTab]     = useState(null);
  const [location, setLocation]     = useState('');
  const [focusIndex, setFocusIndex] = useState(-1);
  const [guests, setGuests]         = useState({ adult: 0, child: 0, infant: 0, pet: 0 });

  const searchBarRef = useRef(null);
  const inputRef     = useRef(null);
  const isKeyboardNav = useRef(false);

  const filteredResults = location.trim().length > 0
    ? SEARCH_DB.filter(item => item.name.includes(location) || item.sub.includes(location))
    : RECOMMENDATIONS;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setActiveTab(null);
        setFocusIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    const getSectionBg = (tabName) => {
      // 하나 active
      if (activeTab === tabName) return '#fff';

      // 하나라도 active 있을 때
      if (activeTab) {
        if (hoverTab === tabName) return '#dcdcdc'; // 다른 섹션 hover 진한 회색
        return '#f7f7f7'; // 나머지 옅은 회색
      }

      // 아무것도 active 없을 때
      if (hoverTab === tabName) return '#ebebeb'; // hover 옅은 회색

      return 'transparent';
    };

    const handleKeyDown = (e) => {
      if (activeTab !== 'location') return;
      const len = filteredResults.length;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        isKeyboardNav.current = true;
        setFocusIndex(prev => (prev + 1) % len);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        isKeyboardNav.current = true;
        setFocusIndex(prev => (prev - 1 + len) % len);
      } else if (e.key === 'Enter' && focusIndex >= 0) {
        selectLocation(filteredResults[focusIndex].name);
      } else if (e.key === 'Escape') {
        setActiveTab(null);
      }
    };

  useEffect(() => {
    if (isKeyboardNav.current && focusIndex >= 0 && filteredResults[focusIndex]) {
      setLocation(filteredResults[focusIndex].name);
    }
  }, [focusIndex]);


  const selectLocation = (name) => {
    setLocation(name);
    setActiveTab(null);
    setFocusIndex(-1);
  };

  const openLocation = () => {
    setActiveTab('location');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const updateCount = (type, op) => {
    setGuests(prev => {
      const cur = prev[type];
      let next = cur;
      if (op === 'plus') next = cur + 1;
      else if (op === 'minus' && cur > 0) next = cur - 1;
      let newAdult = prev.adult;
      if (type !== 'adult' && op === 'plus' && prev.adult === 0) newAdult = 1;
      return { ...prev, adult: newAdult, [type]: next };
    });
  };

  const getGuestText = () => {
    const total = guests.adult + guests.child;
    if (total === 0) return '게스트 추가';
    let text = `게스트 ${total}명`;
    if (guests.infant > 0) text += `, 유아 ${guests.infant}명`;
    if (guests.pet > 0) text += `, 반려동물 ${guests.pet}마리`;
    return text;
  };

  const hasGuests = guests.adult > 0;

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', paddingTop: 50,
      fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
      background: '#f7f7f7', minHeight: '100vh',
    }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div ref={searchBarRef} style={{ position: 'relative', width: 850 }}>

        {/* 서치바 */}
        <div style={{
          display: 'flex', alignItems: 'center', width: '100%', height: 66,
          background: activeTab ? '#f7f7f7' : '#fff',
          borderRadius: 100,
          border: '1px solid #ddd',
          boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
          transition: 'background 0.2s ease',
        }}>

          {/* 여행지 */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              openLocation();
            }}
            onMouseEnter={() => setHoverTab('location')}
            onMouseLeave={() => setHoverTab(null)}
            style={{
              flex: 1, height: '100%', padding: '0 24px 0 32px',
              cursor: 'pointer', borderRadius: 100,
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', justifyContent: 'center',
              background: getSectionBg('location'),
              position: 'relative',
              zIndex: activeTab === 'location' ? 2 : 1,
              boxShadow: activeTab === 'location'
                ? '0 6px 20px rgba(0,0,0,0.18)'
                : 'none',
              transition: 'background 0.15s, box-shadow 0.15s',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: '#222', marginBottom: 2 }}>여행지</div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <input
                ref={inputRef}
                placeholder="여행지 검색"
                value={location}
                onChange={e => { setLocation(e.target.value); setFocusIndex(-1); }}
                style={{
                  border: 'none', outline: 'none', width: '100%',
                  fontSize: 14, color: '#222', background: 'transparent',
                  fontFamily: 'inherit',
                }}
              />
              {/* X 버튼 */}
              {location && (
                <button
                  onClick={e => { e.stopPropagation(); setLocation(''); inputRef.current?.focus(); }}
                  style={{
                    border: 'none', background: '#b0b0b0', borderRadius: '50%',
                    width: 20, height: 20, cursor: 'pointer', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: '#fff', marginLeft: 4,
                  }}
                >✕</button>
              )}
            </div>
          </div>

          <div style={{
            width: 1,
            height: 32,
            background:
              activeTab === 'location' || activeTab === 'date'
                ? 'transparent'
                : '#ddd',
            flexShrink: 0,
            transition: 'background 0.15s',
          }} />

          {/* 날짜 */}
          <div style={{
            flex: 1, height: '100%', padding: '0 24px', cursor: 'pointer',
            borderRadius: 100, display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', justifyContent: 'center',
            background: getSectionBg('date'),
            transition: 'background 0.15s, box-shadow 0.15s',
            position: 'relative',
            zIndex: activeTab === 'date' ? 2 : 1,
            boxShadow: activeTab === 'date'
              ? '0 6px 20px rgba(0,0,0,0.18)'
              : 'none',
          }}
            onClick={() => setActiveTab(null)}
            onMouseEnter={() => setHoverTab('date')}
            onMouseLeave={() => setHoverTab(null)}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: '#222', marginBottom: 2 }}>날짜</div>
            <div style={{ fontSize: 14, color: '#717171' }}>날짜 추가</div>
          </div>

          <div style={{
            width: 1,
            height: 32,
            background:
              activeTab === 'date' || activeTab === 'guests'
                ? 'transparent'
                : '#ddd',
            flexShrink: 0,
            transition: 'background 0.15s',
          }} />

          {/* 여행자 + 검색 버튼 */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab(activeTab === 'guests' ? null : 'guests');
            }}
            onMouseEnter={() => setHoverTab('guests')}
            onMouseLeave={() => setHoverTab(null)}
            style={{
              flex: 1, height: '100%', padding: '0 8px 0 24px', cursor: 'pointer',
              borderRadius: 100, display: 'flex', flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between',
              background: getSectionBg('guests'),
              transition: 'background 0.15s, box-shadow 0.15s',
              position: 'relative',
              zIndex: activeTab === 'guests' ? 2 : 1,
              boxShadow: activeTab === 'guests'
                ? '0 6px 20px rgba(0,0,0,0.18)'
                : 'none',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#222', marginBottom: 2 }}>여행자</div>
              <div style={{ fontSize: 14, color: hasGuests ? '#222' : '#717171', fontWeight: hasGuests ? 600 : 400 }}>
                {getGuestText()}
              </div>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center',
              background: '#FF385C', color: '#fff', border: 'none',
              borderRadius: 100, padding: activeTab ? '12px 16px' : '12px',
              cursor: 'pointer', transition: 'all 0.25s ease', whiteSpace: 'nowrap',
            }}>
              <svg viewBox="0 0 32 32" style={{ width: 16, height: 16, fill: 'currentColor' }}>
                <path d="M29.71 28.29l-6.5-6.5a12 12 0 1 0-1.42 1.42l6.5 6.5a1 1 0 0 0 1.42-1.42zM4 14a10 10 0 1 1 10 10A10 10 0 0 1 4 14z" />
              </svg>
              {activeTab && (
                <span style={{ marginLeft: 8, fontWeight: 700, fontSize: 14 }}>검색</span>
              )}
            </button>
          </div>
        </div>

        {/* 여행지 모달 */}
        {activeTab === 'location' && (
          <div style={{
            position: 'absolute', top: 75, left: 0, width: 420,
            background: '#fff', borderRadius: 32,
            boxShadow: '0 8px 28px rgba(0,0,0,0.12)', zIndex: 100,
            overflow: 'hidden',
          }}>

            {/* 타이틀 고정 영역 */}
            {location.trim().length === 0 && (
              <div style={{
                padding: '16px 32px 8px',
                fontSize: 12, fontWeight: 800, color: '#222',
                textAlign: 'left',
              }}>
                추천 여행지
              </div>
            )}

            {/* 스크롤 영역 */}
            <div
              className="modal-list"
              style={{ maxHeight: 360, overflowY: 'auto', paddingBottom: 16 }}
            >
              {filteredResults.length === 0 && (
                <div style={{ padding: '24px 32px', fontSize: 14, color: '#717171' }}>
                  검색 결과가 없습니다.
                </div>
              )}

              {filteredResults.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => selectLocation(item.name)}
                  onMouseEnter={() => { isKeyboardNav.current = false; setFocusIndex(index); }}
                  onMouseLeave={() => setFocusIndex(-1)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '12px 32px', cursor: 'pointer',
                    background: focusIndex === index ? '#F7F7F7' : 'transparent',
                    transition: 'background 0.1s',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, flexShrink: 0,
                    background: item.type === 'pin' ? '#EBEBEB' : (item.color || '#F1F1F1'),
                    borderRadius: 12, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginRight: 16,
                  }}>
                    {renderIcon(item.type, item.iconColor || '#555')}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <span style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>
                      {location.trim().length > 0 ? highlightMatch(item.name, location) : item.name}
                    </span>
                    <span style={{ fontSize: 14, color: '#717171' }}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 여행자 모달 */}
        {activeTab === 'guests' && (
          <div style={{
            position: 'absolute', top: 75, right: 0, width: 360,
            background: '#fff', borderRadius: 32, padding: '8px 32px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)', zIndex: 100,
          }}>
            
            <GuestRow
              title="성인" desc="13세 이상"
              count={guests.adult} onMinus={() => updateCount('adult', 'minus')} onPlus={() => updateCount('adult', 'plus')}
              minusDisabled={guests.adult === 0 || (guests.adult === 1 && (guests.child > 0 || guests.infant > 0 || guests.pet > 0))}
            />
            <GuestRow
              title="어린이" desc="2~12세"
              count={guests.child} onMinus={() => updateCount('child', 'minus')} onPlus={() => updateCount('child', 'plus')}
              minusDisabled={guests.child === 0}
            />
            <GuestRow
              title="유아" desc="2세 미만"
              count={guests.infant} onMinus={() => updateCount('infant', 'minus')} onPlus={() => updateCount('infant', 'plus')}
              minusDisabled={guests.infant === 0}
            />
            <GuestRow
              title="반려동물" desc="보조동물을 동반하시나요?" isLink
              count={guests.pet} onMinus={() => updateCount('pet', 'minus')} onPlus={() => updateCount('pet', 'plus')}
              minusDisabled={guests.pet === 0}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function highlightMatch(text, query) {
  const idx = text.indexOf(query);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong style={{ fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  );
}
