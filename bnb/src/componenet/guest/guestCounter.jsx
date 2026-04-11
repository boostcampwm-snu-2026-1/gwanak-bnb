import './guestCounter.css'
import '../global.css'
import { useGuest } from './guestContext';

const guestTypes = [
    {id: 'adults', title: '성인', desc: '13세 이상'},
    {id: 'children', title: '어린이', desc: '2~12세'},
    {id: 'infants', title: '유아', desc: ' 2세 미만'},
    {id: 'pets', title: '애완동물', desc: '애완동물'}
];

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

function GuestCounter() {
    const { isOpenGuest, counts, setCounts } = useGuest();

    const update = (id, amount) => {
        setCounts(prev => ({
            ...prev,
            [id]: Math.max(0, prev[id] + amount)
        }))
    };

    return (
        isOpenGuest && (<div className='search-anchor'>
            <div className='modal--number'>
                {guestTypes.map((item, index) => (
                    <CounterRow
                        type={item}
                        count={counts[item.id]}
                        update={update}
                        isLast={index === guestTypes.length - 1}
                    />
                ))}
            </div>
        </div>)
    )
}

export default GuestCounter;