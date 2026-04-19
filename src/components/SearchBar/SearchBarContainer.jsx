import SearchTabMenu from './SearchTabMenu';
import SearchInputGroup from './SearchInputGroup';
import './SearchBarContainer.css';
import {useState, useEffect, useRef} from 'react';


function SearchBarContainer({ onSearch }){

    const [activeField, setActiveField] = useState(null);
    const containerRef = useRef(null);

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if(containerRef.current && !containerRef.current.contains(event.target)){
                setActiveField(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return(
        <div className="search-bar-container" ref = {containerRef}>
            <SearchTabMenu/>
            
            <SearchInputGroup
                activeField={activeField}
                setActiveField={setActiveField}
                onSearch={onSearch}
            />
        </div>
    );
}

export default SearchBarContainer;