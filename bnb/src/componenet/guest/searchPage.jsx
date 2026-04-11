import './searchPage.css'
import useGuestState from './useGuestState';
import CountPage from './countPage';

function SearchPage() { // { onToggle, isOpenGuest, guestMessage, onReset, showReset }

    const {
        onToggle,
        isOpenGuest,
        guestMessage,
        onReset,
        showReset,
        counts,
        setCounts
    } = useGuestState();

    return (
        <>
            <div style={{background: "#eee"}}>
                <div className='main-container'>
                    <div className='search'>
                        <div>
                            <h6>여행지</h6>
                            <p>여행지 검색</p>
                        </div>
                        <div className='divider-right'></div>
                    </div>
                    <div className='search'>
                        <div>
                            <h6>날짜</h6>
                            <p>날짜 추가</p>
                        </div>
                        <div 
                            className={`divider-right ${isOpenGuest ? 'block' : ''}`}
                        ></div>
                    </div>
                    <div 
                        className={`search ${isOpenGuest ? 'active' : ''}`} /* active 클래스명이 유지보수가 어려울지도 */
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
                </div>
            </div>
            { isOpenGuest && (
                <CountPage counts={counts} setCounts={setCounts} />
            )}
        </>
    )
}

export default SearchPage