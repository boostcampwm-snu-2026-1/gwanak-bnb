import { useState } from 'react';
import SearchField from './SearchField';
import GuestPickerModal from '../GuestPicker/GuestPickerModal';
import LocationModal from '../Location/LocationModal';
import './SearchInputGroup.css';


function SearchInputGroup({ activeField, setActiveField, onSearch }) {
    const [locationQuery, setLocationQuery] = useState('');
    const [guests, setGuests] = useState({ adult: 0, child: 0, infant: 0, dogs: 0 });

    const getGuestSummary = () =>{
        const total = guests.adult + guests.child;
        if(total == 0) return '';
        let summary = `게스트 ${total}명`;
        if(guests.infant > 0) summary += ` 어린이 ${guests.infant}명`;
        return summary;
    };

    return (
        <div className='search-input-group'>
            <SearchField
                label="여행지"
                placeholder="여행지 검색"
                isActive={activeField === 'location'}
                onClick={() => setActiveField('location')}
                inputValue={locationQuery}
                onInputChange={e => setLocationQuery(e.target.value)}
            >
                {activeField === 'location' && (
                    <LocationModal
                        query={locationQuery}
                        onSelect={(name) => { setLocationQuery(name); setActiveField(null); }}
                    />
                )}
            </SearchField>
            
            <SearchField 
                label = "날짜"   
                placeholder = "날짜 추가" 
                isActive={activeField === 'date'} 
                onClick={() => setActiveField('date')} 
            />

            <SearchField
                label = "여행자"
                placeholder = "게스트 추가"
                value={getGuestSummary()}
                isActive={activeField === 'guests'}
                onClick={() => setActiveField('guests')}
            >
                {activeField === 'guests' && <GuestPickerModal guests={guests} setGuests={setGuests} />}
            </SearchField>

            <button
                className='search-submit-btn'
                onClick={() => onSearch?.({ city: locationQuery, guests: guests.adult + guests.child })}
                disabled={!locationQuery.trim() || (guests.adult + guests.child) === 0}
            >
                검색
            </button>
        </div>
    );
}
export default SearchInputGroup;