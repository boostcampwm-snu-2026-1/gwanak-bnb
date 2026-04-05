import './searchPage.css'

function SearchPage() {
    return (
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
                    <div className='divider-right'></div>
                </div>
                <div className='search'>
                    <div>
                        <h6>여행자</h6>
                        <p>게스트 추가</p>
                    </div>
                    <form style={{marginLeft: "auto"}}>
                        <button type='button' className='search-btn'>
                            <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchPage