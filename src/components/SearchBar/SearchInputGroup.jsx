import SearchField from './SearchField';
import GuestPickerModal from '../GuestPicker/GuestPickerModal';
import './SearchInputGroup.css';


function SearchInputGroup({ guests, setGuests, activeField, setActiveField }) {
    const getGuestSummary = () =>{
        const total = guests.adult + guests.child;
        if(total == 0) return '';
        let summary = `게스트 ${total}명`;
        if(guests.infant > 0) summary += ` 어린이 ${guests.infant}명`;
        return summary;
    };

    return (
        <div className='search-input-group'>
            <SearchField label = "여행지" placeholder = "여행지 검색" isActive={activeField === 'location'} onClick={() => setActiveField('location')} />
            <SearchField label = "날짜"   placeholder = "날짜 추가" isActive={activeField === 'date'} onClick={() => setActiveField('date')} />
            <SearchField label = "여행자" placeholder = "게스트 추가" value={getGuestSummary()} isActive={activeField === 'guests'} onClick={() => setActiveField('guests')}>
                {activeField === 'guests' && <GuestPickerModal guests={guests} setGuests={setGuests} />}
            </SearchField>

        </div>
    );
}
export default SearchInputGroup;