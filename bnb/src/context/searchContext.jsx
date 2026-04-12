import { createContext, useContext, useState } from "react";
import useGuestState from "../componenet/guest/guestState";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [activeModal, setActiveModal] = useState(null);

    const guest = useGuestState();

    const isOpenGuest = activeModal === 'guest';
    const isOpenDate = activeModal === 'date';
    const isOpenDestination = activeModal === 'destination';

    const isOpen = isOpenGuest || isOpenDate || isOpenDestination;

    const toggleGuest = () => setActiveModal(prev => prev === 'guest' ? null : 'guest');
    const toggleDate = () => setActiveModal(prev => prev === 'date' ? null : 'date');
    const toggleDestination = () => setActiveModal(prev => prev === 'destination' ? null : 'destination');

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    const hasGuest = (guest.counts.adults + guest.counts.children + guest.counts.infants + guest.counts.pets) > 0;

    const showResetGuest = isOpenGuest && hasGuest;

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
        guest
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);