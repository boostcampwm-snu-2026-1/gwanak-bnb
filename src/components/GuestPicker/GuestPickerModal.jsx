import GusetTypeRow from './GuestTypeRow';
import GuestNotice from './GuestNotice';
import './GuestPickerModal.css';

const MAX_GUESTS = 16;
const MAX_INFANTS = 5;

function GusetPickerModal({ guests, setGuests }){
    const totalGuests = guests.adult + guests.child;

    const updateGuest = (type, delta) => {
        setGuests((prev) => ({...prev, [type]: prev[type] + delta}));
    };

    const ensureAdult = (prev) => ({...prev, adult: prev.adult === 0 ? 1 : prev.adult});

    const handleChildIncrement  = () => setGuests((prev) => ({...ensureAdult(prev), child: prev.child + 1}));
    const handleChildDecrement  = () => updateGuest('child', -1);
    const handleInfantIncrement = () => setGuests((prev) => ({...ensureAdult(prev), infant: prev.infant + 1}));
    const handleInfantDecrement = () => updateGuest('infant', -1);

    return (
        <div className='guest-picker-modal'>
            <GusetTypeRow
                label="성인" description="13세 이상" count={guests.adult}
                onIncrement={() => updateGuest('adult', 1)}
                onDecrement={() => updateGuest('adult', -1)}
                minDisabled={guests.adult <= 0}
                maxDisbaled={totalGuests >= MAX_GUESTS}
            />
            <GusetTypeRow
                label="어린이" description="2세~12세" count={guests.child}
                onIncrement={handleChildIncrement}
                onDecrement={handleChildDecrement}
                minDisabled={guests.child <= 0}
                maxDisbaled={totalGuests >= MAX_GUESTS}
            />
            <GusetTypeRow
                label="유아" description="2세 미만" count={guests.infant}
                onIncrement={handleInfantIncrement}
                onDecrement={handleInfantDecrement}
                minDisabled={guests.infant <= 0}
                maxDisbaled={guests.infant >= MAX_INFANTS}
            />
            <GuestNotice />
        </div>
    );
}
export default GusetPickerModal;