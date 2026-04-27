import './guest.css'
import { useSearch } from '../../../context/searchContext';

function GuestSearch() {
    const { isOpen, onToggleGuest, isOpenGuest, showResetGuest, guest, search } = useSearch();
    
    return (
        <>
            <div 
                className={`search ${isOpenGuest ? 'active-right' : ''}`}
                onClick={onToggleGuest}
            >
                <div>
                    <h6>여행자</h6>
                    <p>{guest.guestMessage}</p>
                </div>
                <form className='form-actions'>
                    {showResetGuest && (
                        <button 
                            type='button' 
                            className='delete-btn'
                            onClick={(e) => {
                                e.stopPropagation();
                                guest.onReset();
                            }}
                        >X</button>
                    )}
                    <button 
                        type='button' 
                        className={`search-btn ${isOpen ? 'search-btn_active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            search();
                        }}
                    >
                        <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                        {isOpen && <span style={{ fontSize: '16px', marginLeft: '5px' }}>검색</span>}
                    </button>
                </form>
            </div>
        </>
    )
}

export default GuestSearch