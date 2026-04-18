import { createContext, useContext, useState } from "react";
import useGuestState from "../componenet/searchBar/guest/guestState";
import useDestinationState from "../componenet/searchBar/destination/destinationState";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

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

    useEffect(() => {
        closeModal();
    }, [location.pathname]);

    // 여행자 관리 변수
    const guest = useGuestState();

    const hasGuest = (guest.counts.adults + guest.counts.children + guest.counts.infants + guest.counts.pets) > 0;

    const showResetGuest = isOpenGuest && hasGuest;

    // 여행지 관리 변수
    const destination = useDestinationState();

    // 검색 함수
    const search = () => {
        const { adults, children, infants, pets } = guest.counts;
        const loc = destination.searchTerm;

        const params = new URLSearchParams();
        if (loc) params.append('location', loc);
        if (adults + children + infants + pets > 0) params.append('guests', adults + children + infants + pets);

        navigate(`search?${params.toString()}`);

        closeModal();
    };

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
        closeModal,
        search
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);