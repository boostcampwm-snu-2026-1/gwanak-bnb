function CounterRow({ type, count, update, isLast }) {
    return (
        <div className="number-count">
            <div className='counter-row'>
                <div>
                    <h4>{type.title}</h4>
                    <p>{type.desc}</p>
                </div>
                <form style={{ marginLeft: "auto" }}>
                    <button
                        className='count-btn'
                        onClick={() => update(type.id, -1)}
                        type='button'
                    > - </button>
                    <span>{count}</span>
                    <button 
                        className='count-btn'
                        onClick={() => update(type.id, 1)}
                        type='button'
                    > + </button>
                </form>
            </div>
            {!isLast && <div className='divider-bottom'></div>}
        </div>
    )
};

export default CounterRow;