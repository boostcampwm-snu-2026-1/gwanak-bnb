import './date.css'
import { useSearch } from '../../../context/searchContext';

function DateModal() {
    const { isOpenDate, date } = useSearch();

    if (!isOpenDate) return null;

    return (
        <div className="date-modal" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-container">
                {/* 여기에 실제 달력 라이브러리(react-datepicker 등)를 넣거나 
                    간단한 날짜 선택 input을 넣을 수 있습니다. */}
                <div className="date-inputs">
                    <div>
                        <label>체크인</label>
                        <input 
                            type="date" 
                            value={date.startDate ? date.startDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => date.onDateChange([new Date(e.target.value), date.endDate])}
                        />
                    </div>
                    <div>
                        <label>체크아웃</label>
                        <input 
                            type="date" 
                            value={date.endDate ? date.endDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => date.onDateChange([date.startDate, new Date(e.target.value)])}
                        />
                    </div>
                </div>
                <button className="reset-date-btn" onClick={date.resetDate}>날짜 초기화</button>
            </div>
        </div>
    );
}

export default DateModal;