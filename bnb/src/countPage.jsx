import './countPage.css'

function CountPage({ counts, setCounts }) {
    return (
        <div className='search-anchor'>
            <div className='modal--number'>
                <div className="number-count">
                    <div className='counter-row'>
                        <div>
                            <h4>성인</h4>
                            <p>13세 이상</p>
                        </div>
                        <form style={{ marginLeft: "auto" }}>
                            <button
                                className='count-btn'
                                onClick={() => setCounts({ ...counts, adults: Math.max(0, counts.adults - 1) })}
                                type='button'
                            >-</button>
                            <span>{counts.adults}</span>
                            <button 
                                className='count-btn'
                                onClick={() => setCounts({ ...counts, adults: counts.adults + 1})}
                                type='button'
                            >+</button>
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
                        <form style={{ marginLeft: "auto" }}>
                            <button 
                                className='count-btn'
                                onClick={() => setCounts({ ...counts, children: Math.max(0, counts.children - 1) })}
                                type='button'
                            >-</button>
                            <span>{counts.children}</span>
                            <button 
                                className='count-btn'
                                onClick={() => setCounts({ ...counts, children: counts.children + 1})}  
                                type='button'  
                            >+</button>
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
                        <form style={{ marginLeft: "auto" }}>
                            <button 
                                className='count-btn'
                                onClick={() => setCounts({ ...counts, infants: Math.max(0, counts.infants - 1) })}
                                type='button'
                            >-</button>
                            <span>{counts.infants}</span>
                            <button 
                                className='count-btn'
                                onClick={() => setCounts({ ...counts, infants: counts.infants + 1})}
                                type='button'
                            >+</button>
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
                        <form style={{ marginLeft: "auto" }}>
                            <button 
                                className='count-btn'
                                onClick={() => setCounts({ ...counts, pets: Math.max(0, counts.pets - 1) })}
                                type='button'
                            >-</button>
                            <span>{counts.pets}</span>
                            <button 
                                className='count-btn'
                                onClick={() => setCounts({ ...counts, pets: counts.pets + 1})}
                                type='button'
                            >+</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountPage