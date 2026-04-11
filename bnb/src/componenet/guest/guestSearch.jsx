import '../global.css'
import './guestSearch.css'
import { useGuest } from './guestContext';

function GuestSearch() {
    const { onToggle, isOpenGuest, guestMessage, onReset, showReset } = useGuest();
    
    return (
        <>
            <div 
                className={`search ${isOpenGuest ? 'active' : ''}`}
                onClick={onToggle}
            >
                <div>
                    <h6>여행자</h6>
                    <p>{guestMessage}</p>
                </div>
                <form className='form-actions'>
                    {showReset && (
                        <button 
                            type='button' 
                            className='delete-btn'
                            onClick={(e) => {
                                e.stopPropagation();
                                onReset();
                            }}
                        >X</button>
                    )}
                    <button 
                        type='button' 
                        className={`search-btn ${isOpenGuest ? 'search-btn_active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                        {isOpenGuest && <span style={{ fontSize: '16px', marginLeft: '5px' }}>검색</span>}
                    </button>
                </form>
            </div>
        </>
    )
}

export default GuestSearch