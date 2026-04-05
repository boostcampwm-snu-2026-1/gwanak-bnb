import SearchTabMenu from './SearchTabMenu';
import SearchInputGroup from './SearchInputGroup';
import './SearchBarContainer.css';
import {useState, useEffect, useRef} from 'react';


function SearchBarContainer(){

    const [guests, setGuests] = useState({adult : 0, child : 0, infant : 0, dogs : 0});
    const [activeField, setActiveField] = useState(null);
    const containerRef = useRef(null);

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if(containerRef.current && !containerRef.current.contains(event)){
                setActiveField(null);
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return(
        <div className="search-bar-container" ref = {containerRef}>
            <SearchTabMenu/>
            
            <SearchInputGroup 
                guests = {guests}
                setGuests = {setGuests}
                activeField = {activeField}
                setActiveField = {setActiveField}
            />
        </div>
    );
}

export default SearchBarContainer;