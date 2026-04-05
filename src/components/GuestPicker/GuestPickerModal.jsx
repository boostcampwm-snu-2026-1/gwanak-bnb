import GusetTypeRow from './GuestTypeRow';
import GuestNotice from './GuestNotice';
import './GuestPickerModal.css';

const MAX_GUESTS = 16;
const MAX_INFANTS = 5;

function GusetPickerModal({ guests, setGuests }){
    const totalGuests = guests.adult + guests.child;

    const updateGuest = (type, delta) => {
        setGuests((prev) => ({...prev, [type]: prev[type] + delta}));
    }

    return (
    <div className='guest-picker-modal'>
        <GusetTypeRow label = "성인" description="13세 이상" count={guests.adult}
        onIncrement = {() => updateGuest('adult', 1)} onDecrement = {() => updateGuest('adult', -1)}
        minDisabled = {guests.adult <= 0} maxDisbaled = {totalGuests >= MAX_GUESTS}
        />

        <GusetTypeRow label = "어린이" description="2세~12세" count={guests.child}
        onIncrement = {() => setGuests((prev) => ({...prev, child: prev.child + 1, adult: prev.adult === 0 ? 1 : prev.adult}))}
        onDecrement = {() => updateGuest('child', -1)}
        minDisabled = {guests.child <= 0} maxDisbaled = {totalGuests >= MAX_GUESTS}
        />

        <GusetTypeRow label = "유아" description="2세 미만" count={guests.infant}
        onIncrement = {() => setGuests((prev) => ({...prev, infant: prev.infant + 1, adult: prev.adult === 0 ? 1 : prev.adult}))}
        onDecrement = {() => updateGuest('infant', -1)}
        minDisabled = {guests.infant <= 0} maxDisbaled = {guests.infant >= MAX_INFANTS}
        />

        <GuestNotice></GuestNotice>

    </div>
    );
}
export default GusetPickerModal;