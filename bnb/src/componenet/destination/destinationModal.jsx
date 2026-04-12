import './destination.css'
import { useSearch } from '../../context/searchContext';
import DestinationRow from './createDestinationRow';

function DestinationModal() {
    const { isOpenDestination } = useSearch();
    return (
        isOpenDestination && (<div className='modal-destination'>
            <div className='destination-option'>
                <div className='destination-row'>
                    <div className='loc-icon'><i class="fa-solid fa-location-dot fa-lg"></i></div>
                    <div className='loc-desc'>
                        <h4>서울</h4>
                        <p>대한민국</p>
                    </div>
                </div>
            </div>

            <DestinationRow 
                iconClass="fa-solid fa-location-dot fa-lg"
                destination="서울"
                desc="대한민국"
            />
        </div>)
    );
};

export default DestinationModal;