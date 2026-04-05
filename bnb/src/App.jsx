import { useState } from 'react'
import './App.css'

function App() {
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
            <div className='search-anchor'>
                <div className='modal--number'>
                    <div className="number-count">
                        <div className='counter-row'>
                            <div>
                                <h4>성인</h4>
                                <p>13세 이상</p>
                            </div>
                            <form style={{marginLeft: "auto"}}>
                                <button className='count-btn'>-</button>
                                <span>0</span>
                                <button className='count-btn'>+</button>
                            </form>
                        </div>
                        <div className='divider-bottom'></div>
                    </div>
                    <div className="number-count">
                        <div className='counter-row'>
                            <div>
                                <h4>어린이</h4>
                                <p>2~12세</p>
                            </div>
                            <form style={{marginLeft: "auto"}}>
                                <button className='count-btn'>-</button>
                                <span>0</span>
                                <button className='count-btn'>+</button>
                            </form>
                        </div>
                        <div className='divider-bottom'></div>
                    </div>
                    <div className="number-count">
                        <div className='counter-row'>
                            <div>
                                <h4>유아</h4>
                                <p>2세 미만</p>
                            </div>
                            <form style={{marginLeft: "auto"}}>
                                <button className='count-btn'>-</button>
                                <span>0</span>
                                <button className='count-btn'>+</button>
                            </form>
                        </div>
                        <div className='divider-bottom'></div>
                    </div>
                    <div className="number-count">
                        <div className='counter-row'>
                            <div>
                                <h4>애완동물</h4>
                                <p>애완동물</p>
                            </div>
                            <form style={{marginLeft: "auto"}}>
                                <button className='count-btn'>-</button>
                                <span>0</span>
                                <button className='count-btn'>+</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
