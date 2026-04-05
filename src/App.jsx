import React, { useState } from 'react';

export default function App() {
  // 모달 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 인원 유형별 상태 관리
  const [guests, setGuests] = useState({
    adult: 0,
    child: 0,
    infant: 0,
    pet: 0,
  });

  // 카운트 변경 함수
  const updateCount = (type, operation) => {
    setGuests((prev) => {
      const currentCount = prev[type];
      let newCount = currentCount;

      if (operation === 'plus') {
        newCount = currentCount + 1;
      } else if (operation === 'minus' && currentCount > 0) {
        newCount = currentCount - 1;
      }

      // 어린이, 유아, 반려동물이 추가되면 성인은 최소 1명 이상
      let newAdult = prev.adult;
      if (type !== 'adult' && operation === 'plus' && prev.adult === 0) {
        newAdult = 1;
      }

      return {
        ...prev,
        adult: newAdult,
        [type]: newCount,
      };
    });
  };

  // 총 인원 수 텍스트 변환
  const getGuestText = () => {
    const total = guests.adult + guests.child;
    if (total === 0) return '게스트 추가';
    
    let text = `게스트 ${total}명`;
    if (guests.infant > 0) text += `, 유아 ${guests.infant}명`;
    if (guests.pet > 0) text += `, 반려동물 ${guests.pet}마리`;
    return text;
  };

  return (
    <div style={styles.container}>
      {/* 전체 검색 바 */}
      <div style={styles.searchBar}>
        
        {/* 여행지 */}
        <div style={styles.searchSection}>
          <div style={styles.label}>여행지</div>
          <div style={styles.placeholder}>여행지 검색</div>
        </div>
        
        <div style={styles.divider} />

        {/* 날짜 */}
        <div style={styles.searchSection}>
          <div style={styles.label}>날짜</div>
          <div style={styles.placeholder}>날짜 추가</div>
        </div>

        <div style={styles.divider} />

        {/* 여행자 + 검색 버튼 */}
        <div 
          style={styles.guestSection} 
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {/* 텍스트들만 담은 div */}
          <div style={styles.guestTextGroup}>
            <div style={styles.label}>여행자</div>
            <div style={guests.adult > 0 ? styles.activeText : styles.placeholder}>
              {getGuestText()}
            </div>
          </div>
          
          {/* 검색 아이콘 버튼 */}
          <button style={styles.searchButton}>
            <svg viewBox="0 0 32 32" style={styles.searchIcon} aria-hidden="true">
              <path d="M29.71 28.29l-6.5-6.5a12 12 0 1 0-1.42 1.42l6.5 6.5a1 1 0 0 0 1.42-1.42zM4 14a10 10 0 1 1 10 10A10 10 0 0 1 4 14z" />
            </svg>
            {isModalOpen && <span style={styles.searchText}>검색</span>}
          </button>
        </div>

        {/* 인원 선택 모달 */}
        {isModalOpen && (
          <div style={styles.modal}>
            <GuestRow 
              title="성인" 
              desc="13세 이상" 
              count={guests.adult} 
              onMinus={() => updateCount('adult', 'minus')}
              onPlus={() => updateCount('adult', 'plus')}
              // 어린이 등이 있는데 성인을 0으로 줄이려 할 때 방지
              minusDisabled={guests.adult === 0 || (guests.adult === 1 && (guests.child > 0 || guests.infant > 0 || guests.pet > 0))}
            />
            <GuestRow 
              title="어린이" 
              desc="2~12세" 
              count={guests.child} 
              onMinus={() => updateCount('child', 'minus')}
              onPlus={() => updateCount('child', 'plus')}
              minusDisabled={guests.child === 0}
            />
            <GuestRow 
              title="유아" 
              desc="2세 미만" 
              count={guests.infant} 
              onMinus={() => updateCount('infant', 'minus')}
              onPlus={() => updateCount('infant', 'plus')}
              minusDisabled={guests.infant === 0}
            />
            <GuestRow 
              title="반려동물" 
              desc="보조동물을 동반하시나요?" 
              count={guests.pet} 
              onMinus={() => updateCount('pet', 'minus')}
              onPlus={() => updateCount('pet', 'plus')}
              minusDisabled={guests.pet === 0}
              isLink={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// 카운터 행 컴포넌트
function GuestRow({ title, desc, count, onMinus, onPlus, minusDisabled, isLink }) {
  return (
    <div style={styles.row}>
      <div>
        <div style={styles.rowTitle}>{title}</div>
        <div style={isLink ? styles.rowDescLink : styles.rowDesc}>{desc}</div>
      </div>
      <div style={styles.counterGroup}>
        <button 
          onClick={onMinus} 
          style={minusDisabled ? styles.roundBtnDisabled : styles.roundBtn}
          disabled={minusDisabled}
        >
          －
        </button>
        <span style={styles.countText}>{count}</span>
        <button onClick={onPlus} style={styles.roundBtn}>
          ＋
        </button>
      </div>
    </div>
  );
}

// 인라인 스타일
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '50px',
    fontFamily: 'sans-serif',
    backgroundColor: '#f7f7f7',
    height: '100vh',
  },
  searchBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '850px',
    height: '66px',
    backgroundColor: '#fff',
    borderRadius: '100px',
    border: '1px solid #ddd',
    boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
  },
  searchSection: {
    flex: 1,
    padding: '14px 24px',
    cursor: 'pointer',
    borderRadius: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', 
    justifyContent: 'center',
    height: '100%',
    boxSizing: 'border-box',
    '&:hover': { backgroundColor: '#f5f5f5' },
  },
  guestSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '0 8px 0 24px',
    cursor: 'pointer',
    borderRadius: '100px',
    height: '100%',
    boxSizing: 'border-box',
    '&:hover': { backgroundColor: '#f5f5f5' },
  },
  guestTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  divider: {
    width: '1px',
    height: '32px',
    backgroundColor: '#ddd',
  },
  label: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '2px',
  },
  placeholder: {
    fontSize: '14px',
    color: '#717171',
  },
  activeText: {
    fontSize: '14px',
    color: '#222',
    fontWeight: '500',
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FF385C',
    color: '#fff',
    border: 'none',
    borderRadius: '100px',
    padding: '12px',
    cursor: 'pointer',
  },
  searchIcon: {
    width: '16px',
    height: '16px',
    fill: 'currentColor',
  },
  searchText: {
    marginLeft: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  /* 모달 스타일 */
  modal: {
    position: 'absolute',
    top: '75px',
    right: 0,
    width: '400px',
    backgroundColor: '#fff',
    borderRadius: '32px',
    padding: '16px 32px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    zIndex: 10,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #ebebeb',
  },
  rowTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#222',
  },
  rowDesc: {
    fontSize: '14px',
    color: '#717171',
  },
  rowDescLink: {
    fontSize: '14px',
    color: '#717171',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  counterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  countText: {
    fontSize: '16px',
    color: '#222',
    minWidth: '18px',
    textAlign: 'center',
  },
  roundBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid #b0b0b0',
    backgroundColor: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#717171',
  },
  roundBtnDisabled: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid #ebebeb',
    backgroundColor: '#fff',
    cursor: 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#ebebeb',
  },
};