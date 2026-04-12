import './destination.css'
import { useSearch } from '../../context/searchContext';

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
                <div className='divider-bottom'></div>
            </div>

            <div className='destination-option'>
                <div className='destination-row'>
                    <div className='loc-icon'><i class="fa-solid fa-location-dot fa-lg"></i></div>
                    <div className='loc-desc'>
                        <h4>서울</h4>
                        <p>대한민국</p>
                    </div>
                </div>
            </div>
        </div>)
    );
};

export default DestinationModal;