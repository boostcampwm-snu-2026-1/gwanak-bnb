import './guest.css'
import CounterRow from './createCounterRow';
import { useSearch } from '../../../context/searchContext';

function GuestCounter() {
    const { isOpenGuest, guest } = useSearch();

    const guestTypes = [
        {id: 'adults', title: '성인', desc: '13세 이상'},
        {id: 'children', title: '어린이', desc: '2~12세'},
        {id: 'infants', title: '유아', desc: ' 2세 미만'},
        {id: 'pets', title: '애완동물', desc: '애완동물'}
    ];

    const update = (id, amount) => {
        guest.setCounts(prev => ({
            ...prev,
            [id]: Math.max(0, prev[id] + amount)
        }))
    };

    return (
        isOpenGuest && (
        <div className='modal--number'>
            {guestTypes.map((item, index) => (
                <CounterRow
                    key={item.id}
                    type={item}
                    count={guest.counts[item.id]}
                    update={update}
                    isLast={index === guestTypes.length - 1}
                />
            ))}
        </div>)
    )
}

export default GuestCounter;