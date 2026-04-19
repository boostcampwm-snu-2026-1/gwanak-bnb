import { useState } from 'react';
import overlayStyles from '../../styles/overlay.module.css';
import styles from './DatePicker.module.css';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isInRange(date, checkIn, checkOut) {
  if (!checkIn || !checkOut || !date) return false;
  return date > checkIn && date < checkOut;
}

function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function Calendar({ year, month, checkIn, checkOut, onDateClick }) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<td key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const past = isPastDate(date);
    const isCheckIn = isSameDay(date, checkIn);
    const isCheckOut = isSameDay(date, checkOut);
    const inRange = isInRange(date, checkIn, checkOut);

    let className = styles.day;
    if (past) className += ` ${styles.disabled}`;
    if (isCheckIn) className += ` ${styles.selected} ${styles.checkIn}`;
    if (isCheckOut) className += ` ${styles.selected} ${styles.checkOut}`;
    if (inRange) className += ` ${styles.inRange}`;

    cells.push(
      <td key={day}>
        <button
          className={className}
          disabled={past}
          onClick={() => onDateClick(date)}
        >
          {day}
        </button>
      </td>
    );
  }

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(<tr key={i}>{cells.slice(i, i + 7)}</tr>);
  }

  const monthName = `${year}년 ${month + 1}월`;

  return (
    <div className={styles.calendar}>
      <h4 className={styles.monthTitle}>{monthName}</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            {DAYS.map((d) => (
              <th key={d} className={styles.dayHeader}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function DatePicker({ isOpen, checkIn, checkOut, onDateSelect, onClose }) {
  const today = new Date();
  const [baseMonth, setBaseMonth] = useState(today.getMonth());
  const [baseYear, setBaseYear] = useState(today.getFullYear());

  if (!isOpen) return null;

  const secondMonth = baseMonth + 1 > 11 ? 0 : baseMonth + 1;
  const secondYear = baseMonth + 1 > 11 ? baseYear + 1 : baseYear;

  const handlePrev = () => {
    const now = new Date();
    if (baseYear === now.getFullYear() && baseMonth === now.getMonth()) return;
    if (baseMonth === 0) {
      setBaseMonth(11);
      setBaseYear(baseYear - 1);
    } else {
      setBaseMonth(baseMonth - 1);
    }
  };

  const handleNext = () => {
    if (baseMonth === 11) {
      setBaseMonth(0);
      setBaseYear(baseYear + 1);
    } else {
      setBaseMonth(baseMonth + 1);
    }
  };

  return (
    <div className={overlayStyles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.nav}>
          <button className={styles.navButton} onClick={handlePrev}>&lt;</button>
          <button className={styles.navButton} onClick={handleNext}>&gt;</button>
        </div>
        <div className={styles.calendars}>
          <Calendar
            year={baseYear}
            month={baseMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            onDateClick={onDateSelect}
          />
          <Calendar
            year={secondYear}
            month={secondMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            onDateClick={onDateSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
