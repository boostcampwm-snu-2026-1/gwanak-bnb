import './destination.css'
import { useSearch } from '../../../context/searchContext'
import { useRef } from 'react';

function DestinationSearch() {
    const { isOpenDestination, onToggleDestination, destination } = useSearch();
    const inputRef = useRef(null);

    const handleConatinerClick = () => {
        onToggleDestination();
        inputRef.current.focus();
    };

    return (
        <div 
            className={`search ${isOpenDestination ? 'active-left' : ''}`}
            onClick={handleConatinerClick}
        >
            <div>
                <h6>여행지</h6>
                <form className='input-dest'>
                    <input 
                        ref={inputRef}
                        className='onhover' 
                        placeholder='여행지 검색'
                        value={destination.searchTerm}
                        onChange={(e) => destination.onSearchChange(e.target.value)} 
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isOpenDestination) onToggleDestination();
                        }}
                        onKeyDown={destination.handleKeyDown}
                    />
                </form>
            </div>
            <div className='divider-right'></div>
        </div>
    )
}

export default DestinationSearch