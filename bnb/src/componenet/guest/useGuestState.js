import { useState } from 'react';

const useGuestState = () => {
    const [isOpenGuest, setisOpenGuest] = useState(false);
    const onToggle = () => setisOpenGuest(!isOpenGuest);

    const [counts, setCounts] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
    });

    const guestCount = counts.adults + counts.children + counts.infants + counts.pets;

    const getGuestMessage = () => {
        if (guestCount === 0) return '게스트 추가';

        else return `게스트 ${guestCount}명`;
    }
    const guestMessage = getGuestMessage();

    const onReset = () => {
        setCounts({
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        });
    };

    const showReset = isOpenGuest && guestCount > 0;

    return {
        onToggle,
        isOpenGuest,
        guestMessage,
        onReset,
        showReset,
        counts,
        setCounts
    }
};

export default useGuestState;