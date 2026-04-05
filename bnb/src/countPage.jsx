import './countPage.css'

function CountPage() {
    return (
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
    )
}

export default CountPage