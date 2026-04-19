import React, { useState, useRef, useEffect } from 'react';
import './DatePicker.css';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const DURATION_OPTIONS = ['주말', '일주일', '한 달'];
const FLEX_OPTIONS = ['정확한 날짜', '± 1일', '± 2일', '± 3일', '± 7일', '± 14일'];

function getFlexDays(opt) {
  const m = opt.match(/± (\d+)일/);
  return m ? parseInt(m[1]) : 0;
}
function addDays(date, n) {
  const d = new Date(date); d.setDate(d.getDate() + n); d.setHours(0,0,0,0); return d;
}
function toDate(y, m, d) {
  const dt = new Date(y, m, d); dt.setHours(0,0,0,0); return dt;
}
function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

export default function DatePicker({ checkIn, checkOut, onChange, onFlexChange }) {
  const today = new Date(); today.setHours(0,0,0,0);

  const [leftYear,  setLeftYear]  = useState(today.getFullYear());
  const [leftMonth, setLeftMonth] = useState(today.getMonth());
  const [mode, setMode]           = useState('날짜 지정');
  const [hoverDate, setHoverDate] = useState(null);
  const [checkInFlex,  setCheckInFlex]  = useState('정확한 날짜');
  const [checkOutFlex, setCheckOutFlex] = useState('정확한 날짜');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedDuration,  setSelectedDuration]  = useState(null);
  const [selectedFlexMonth, setSelectedFlexMonth] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenDropdown(null); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
  const rightYear  = leftMonth === 11 ? leftYear + 1 : leftYear;

  const goPrev = () => {
    const pm = leftMonth === 0 ? 11 : leftMonth - 1;
    const py = leftMonth === 0 ? leftYear - 1 : leftYear;
    if (new Date(py, pm, 1) < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    setLeftMonth(pm); setLeftYear(py);
  };
  const goNext = () => {
    if (leftMonth === 11) { setLeftMonth(0); setLeftYear(y => y+1); }
    else setLeftMonth(m => m+1);
  };

  const handleDayClick = (y, m, d) => {
    const clicked = toDate(y, m, d);
    if (clicked < today) return;
    if (!checkIn || (checkIn && checkOut)) { onChange(clicked, null); }
    else if (clicked < checkIn) { onChange(clicked, null); }
    else if (clicked.getTime() === checkIn.getTime()) { onChange(null, null); }
    else { onChange(checkIn, clicked); }
  };

  /**
   * 날짜 하나에 대해 배경 스타일을 결정하는 핵심 함수
   *
   * 배경 구간 3종:
   *   FLEX_IN  : [flexInStart ... checkIn-1]  — 연한 회색, 체크인 왼쪽 유연범위
   *   MAIN     : [checkIn ... checkOut-1]      — 진한 회색
   *   FLEX_OUT : [checkOut+1 ... flexOutEnd]   — 연한 회색, 체크아웃 오른쪽 유연범위
   *
   * 각 구간의 첫날 → 왼쪽 반원(캡)
   * 각 구간의 마지막날 → 오른쪽 반원(캡)
   * 달 경계(1일, 말일) → 그라데이션으로 페이드
   */
  const getDayStyle = (y, m, d) => {
    const dt = toDate(y, m, d);
    const isPast = dt < today;
    const ts = dt.getTime();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const isFirst = d === 1;
    const isLast = d === daysInMonth;
    const day = dt.getDay(); 

    const inFlex = getFlexDays(checkInFlex);
    const outFlex = getFlexDays(checkOutFlex);
    const effectiveEnd = checkOut || hoverDate;

    // 1. 구간 판정
    const inCheckInFlex = checkIn && inFlex > 0 && 
                          dt >= addDays(checkIn, -inFlex) && dt <= addDays(checkIn, inFlex);
    const inCheckOutFlex = checkOut && outFlex > 0 && 
                          dt >= addDays(checkOut, -outFlex) && dt <= addDays(checkOut, outFlex);
    const inMain = checkIn && effectiveEnd && dt >= checkIn && dt <= effectiveEnd;

    // 2. 배경색 결정 (이미지처럼 유연 구간이 시각적으로 더 중요하므로 'flex' 우선)
    let bgColor = null;
    if (inCheckInFlex || inCheckOutFlex) {
      bgColor = 'flex'; 
    } else if (inMain) {
      bgColor = 'main'; 
    }

    // 3. 각 구간의 시각적 시작/끝 (캡슐의 반원 위치 계산)
    const ciFlexStart = checkIn ? addDays(checkIn, -inFlex) : null;
    const ciFlexEnd   = checkIn ? addDays(checkIn, inFlex) : null;
    const coFlexStart = checkOut ? addDays(checkOut, -outFlex) : null;
    const coFlexEnd   = checkOut ? addDays(checkOut, outFlex) : null;

    // 현재 날짜가 어떤 캡슐의 끝단인지 확인
    const isCapLeft = (bgColor === 'flex' && ((ciFlexStart && ts === ciFlexStart.getTime()) || (coFlexStart && ts === coFlexStart.getTime()))) ||
                      (bgColor === 'main' && checkIn && ts === checkIn.getTime() && inFlex === 0);
    const isCapRight = (bgColor === 'flex' && ((ciFlexEnd && ts === ciFlexEnd.getTime()) || (coFlexEnd && ts === coFlexEnd.getTime()))) ||
                      (bgColor === 'main' && effectiveEnd && ts === effectiveEnd.getTime() && outFlex === 0);

    // 4. 흰색 보더 및 라운딩 (image_43ebbf.png 스타일)
    let borderStyle = {};
    if (bgColor === 'flex') {
      borderStyle.borderTop = '2px solid white';
      borderStyle.borderBottom = '2px solid white';
      
      // 왼쪽이 막혀야 하는 경우: 캡슐 시작점, 일요일, 혹은 달의 시작
      if (isCapLeft || day === 0 || isFirst) {
        borderStyle.borderLeft = '2px solid white';
        borderStyle.borderTopLeftRadius = '50px';
        borderStyle.borderBottomLeftRadius = '50px';
      }
      // 오른쪽이 막혀야 하는 경우: 캡슐 끝점, 토요일, 혹은 달의 끝
      if (isCapRight || day === 6 || isLast) {
        borderStyle.borderRight = '2px solid white';
        borderStyle.borderTopRightRadius = '50px';
        borderStyle.borderBottomRightRadius = '50px';
      }
    } else if (bgColor === 'main') {
      // 메인 구간은 보더 없이 연결부 라운딩만 처리
      if (day === 6 && !isCapRight) {
        borderStyle.borderTopRightRadius = '50px';
        borderStyle.borderBottomRightRadius = '50px';
      }
      if (day === 0 && !isCapLeft) {
        borderStyle.borderTopLeftRadius = '50px';
        borderStyle.borderBottomLeftRadius = '50px';
      }
    }

    // 달 경계 그라데이션 변수 생성
    const fadeLeft = !isCapLeft && isFirst && bgColor;
    const fadeRight = !isCapRight && isLast && bgColor;

    const numClass = [
      'dp-day-num',
      isPast ? 'past' : '',
      checkIn && ts === checkIn.getTime() ? 'check-in' : '',
      checkOut && ts === checkOut.getTime() ? 'check-out' : '',
    ].filter(Boolean).join(' ');

    return { bgColor, capLeft: isCapLeft, capRight: isCapRight, fadeLeft, fadeRight, numClass, borderStyle };
  };

  const getBgStyle = ({ bgColor, capLeft, capRight, fadeLeft, fadeRight, borderStyle }) => {
    if (!bgColor) return {};

    const color = bgColor === 'main' ? '#EBEBEB' : '#F7F7F7';
    const colorTrans = bgColor === 'main' ? 'rgba(235,235,235,0)' : 'rgba(247,247,247,0)';
    
    const baseStyle = {
      background: color,
      ...borderStyle,
    };

    // 달 경계 그라데이션
    if (fadeLeft && fadeRight) {
      return { ...baseStyle, background: `linear-gradient(to right, ${colorTrans} 0%, ${color} 20%, ${color} 80%, ${colorTrans} 100%)` };
    }
    if (fadeLeft) return { ...baseStyle, background: `linear-gradient(to right, ${colorTrans} 0%, ${color} 40%)` };
    if (fadeRight) return { ...baseStyle, background: `linear-gradient(to left, ${colorTrans} 0%, ${color} 40%)` };

    // 캡(반원) 처리: 50% 마진이 날짜 원형 배경과 정확히 맞물립니다.
    if (capLeft && capRight) return {}; // 하루만 선택된 경우 배경 생략 (원형만 표시)
    
    if (capLeft) {
      return {
        ...baseStyle,
        marginLeft: '50%',
      };
    }
    if (capRight) {
      return {
        ...baseStyle,
        marginRight: '50%',
      };
    }

    return baseStyle;
  };

  const isLeftMostPrev = () =>
    new Date(leftYear, leftMonth, 1) <= new Date(today.getFullYear(), today.getMonth(), 1);

  const renderCalendar = (y, m, side) => (
    <div className="dp-calendar" key={`${y}-${m}`}>
      <div className="dp-cal-header">
        {side === 'left'  && <button className="dp-nav" onClick={goPrev} disabled={isLeftMostPrev()}>‹</button>}
        <span className="dp-cal-title">{y}년 {m+1}월</span>
        {side === 'right' && <button className="dp-nav" onClick={goNext}>›</button>}
      </div>
      <div className="dp-grid">
        {DAYS.map(d => <div key={d} className="dp-weekday">{d}</div>)}
        {getCalendarDays(y, m).map((d, i) => {
          if (!d) return <div key={`e${i}`} className="dp-day-empty" />;
          const style = getDayStyle(y, m, d);
          const bgStyle = getBgStyle(style);
          return (
            <div
              key={d}
              className="dp-day-cell"
              onClick={() => !style.isPast && handleDayClick(y, m, d)}
              onMouseEnter={() => checkIn && !checkOut && setHoverDate(toDate(y, m, d))}
              onMouseLeave={() => setHoverDate(null)}
            >
              {/* 배경 띠 */}
              <div className="dp-day-bg" style={bgStyle} />
              {/* 숫자 */}
              <span className={style.numClass}>{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const fmtBox = (dt) => dt
    ? `${dt.getFullYear()}. ${String(dt.getMonth()+1).padStart(2,'0')}. ${String(dt.getDate()).padStart(2,'0')}.`
    : '정확한 날짜';

  const flexMonths = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  return (
    <div className="dp-wrapper">
      <div className="dp-tabs-wrap">
        <div className="dp-tabs">
          {['날짜 지정', '유연한 일정'].map(t => (
            <button key={t} className={`dp-tab${mode === t ? ' active' : ''}`} onClick={() => {
              setMode(t);
              if (t === '날짜 지정') {
                onFlexChange?.({ duration: null, months: [] });
              } else {
                // 유연한 일정 탭으로 전환 시 현재 선택 상태 전달 (아무것도 없으면 빈 값으로)
                onFlexChange?.({ duration: selectedDuration, months: selectedFlexMonth });
              }
            }}>{t}</button>
          ))}
        </div>
      </div>

      {mode === '날짜 지정' && (
        <>
          <div className="dp-calendars">
            {renderCalendar(leftYear, leftMonth, 'left')}
            {renderCalendar(rightYear, rightMonth, 'right')}
          </div>

          <div className="dp-bottom-bar" ref={dropdownRef}>
            <div className="dp-checkinout">
              {[
                { key: 'in',  label: '체크인',   date: checkIn,  flex: checkInFlex,  setFlex: setCheckInFlex  },
                { key: 'out', label: '체크아웃', date: checkOut, flex: checkOutFlex, setFlex: setCheckOutFlex },
              ].map(({ key, label, date, flex, setFlex }) => (
                <div className="dp-checkinout-wrap" key={key}>
                  <div className={`dp-checkinout-box${openDropdown === key ? ' open' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === key ? null : key)}>
                    <span className="dp-checkinout-label">{label}</span>
                    <span className="dp-checkinout-value">
                      {date ? (flex === '정확한 날짜' ? fmtBox(date) : flex) : '정확한 날짜'}
                    </span>
                    <span className="dp-checkinout-arrow">∨</span>
                  </div>
                  {openDropdown === key && (
                    <div className="dp-dropdown">
                      {FLEX_OPTIONS.map(opt => (
                        <div key={opt} className={`dp-dropdown-item${flex === opt ? ' selected' : ''}`}
                          onClick={() => { setFlex(opt); setOpenDropdown(null); }}>{opt}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {(checkIn || checkOut) && (
              <button className="dp-clear" onClick={() => {
                onChange(null, null);
                setCheckInFlex('정확한 날짜');
                setCheckOutFlex('정확한 날짜');
              }}>날짜 지우기</button>
            )}
          </div>
        </>
      )}

      {mode === '유연한 일정' && (
        <div className="dp-flexible">
          <p className="dp-flex-title">숙박 기간을 선택하세요.</p>
          <div className="dp-duration-row">
            {DURATION_OPTIONS.map(opt => (
              <button key={opt} className={`dp-duration-btn${selectedDuration === opt ? ' active' : ''}`}
                onClick={() => {
                  setSelectedDuration(opt);
                  onFlexChange?.({ duration: opt, months: selectedFlexMonth });
                }}>{opt}</button>
            ))}
          </div>
          <p className="dp-flex-title" style={{ marginTop: 32 }}>여행 날짜를 선택하세요.</p>
          <div className="dp-month-scroll">
            {flexMonths.map(({ year, month }) => {
              const key = `${year}-${month}`;
              const sel = selectedFlexMonth.includes(key);
              return (
                <button key={key} className={`dp-month-card${sel ? ' active' : ''}`}
                  onClick={() => {
                    const next = sel
                      ? selectedFlexMonth.filter(k => k !== key)
                      : [...selectedFlexMonth, key];
                    setSelectedFlexMonth(next);
                    onFlexChange?.({ duration: selectedDuration, months: next });
                  }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M3 9h18M8 2v4M16 2v4"/>
                    <rect x="7" y="13" width="3" height="3" rx="0.5"/>
                  </svg>
                  <span className="dp-month-name">{month+1}월</span>
                  <span className="dp-month-year">{year}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
