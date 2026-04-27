import { useState } from 'react';

const useGuestState = () => {
    // 여행자 수
    const [counts, setCounts] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
    });

    const guestCount = counts.adults + counts.children + counts.infants + counts.pets;

    // 여행자 수에 따른 표시 메시지
    const getGuestMessage = () => {
        if (guestCount === 0) return '게스트 추가';

        else return `게스트 ${guestCount}명`;
    }
    const guestMessage = getGuestMessage();

    // 여행자 초기화 버튼
    const onReset = () => {
        setCounts({
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        });
    };
 
    return {
        guestMessage,
        onReset,
        counts,
        setCounts
    }
};

export default useGuestState;