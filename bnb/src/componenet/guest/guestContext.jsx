import { createContext, useContext } from 'react'
import useGuestState from './guestState'

const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
    const value = useGuestState();

    return (
        <GuestContext.Provider value={value}>
            {children}
        </GuestContext.Provider>
    );
};

export const useGuest = () => useContext(GuestContext);