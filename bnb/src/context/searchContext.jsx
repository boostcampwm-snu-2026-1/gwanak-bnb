import { createContext, useContext, useState } from "react";
import useGuestState from "../componenet/guest/guestState";
import useDestinationState from "../componenet/destination/destinationState";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [activeModal, setActiveModal] = useState(null);

    // 모달창 관리 변수
    const isOpenGuest = activeModal === 'guest';
    const isOpenDate = activeModal === 'date';
    const isOpenDestination = activeModal === 'destination';

    const isOpen = isOpenGuest || isOpenDate || isOpenDestination;

    const toggleGuest = () => setActiveModal(prev => prev === 'guest' ? null : 'guest');
    const toggleDate = () => setActiveModal(prev => prev === 'date' ? null : 'date');
    const toggleDestination = () => setActiveModal(prev => prev === 'destination' ? null : 'destination');

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    // 여행자 관리 변수
    const guest = useGuestState();

    const hasGuest = (guest.counts.adults + guest.counts.children + guest.counts.infants + guest.counts.pets) > 0;

    const showResetGuest = isOpenGuest && hasGuest;

    // 여행지 관리 변수
    const destination = useDestinationState();

    const value = {
        activeModal,
        setActiveModal,
        isOpen,
        isOpenGuest,
        showResetGuest,
        isOpenDate,
        isOpenDestination,
        onToggleGuest: toggleGuest,
        onToggleDestination: toggleDestination,
        guest,
        destination,
        closeModal
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);