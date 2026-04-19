import './date.css'
import { useSearch } from '../../../context/searchContext'

function DateSearch() {
    const { date, onToggleDate, isOpenDate } = useSearch();

    const getDateDisplay = () => {
        if (!date.startDate) return "날짜 추가";
        const start = new Date(date.startDate).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
        if (!date.endDate) return `${start} ~ 종료일`;
        const end = new Date(date.endDate).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
        return `${start} ~ ${end}`;
    };

    return (
        <div 
            className={`search ${isOpenDate ? 'active-center' : ''}`}
            onClick={onToggleDate}
        >
            <div>
                <h6>날짜</h6>
                <p>
                    {getDateDisplay()}
                </p>
            </div>
            <div className='divider-right'></div>
        </div>
    )
}

export default DateSearch