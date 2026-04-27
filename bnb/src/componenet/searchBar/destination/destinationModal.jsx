import './destination.css'
import { useSearch } from '../../../context/searchContext';
import DestinationRow from './createDestinationRow';

function DestinationModal() {
    const { isOpenDestination, destination } = useSearch();

    return (
        isOpenDestination && destination.displayList.length > 0 && (
        <div className='modal-destination'>
            {destination.displayList.map(((item, index) => (
                <DestinationRow 
                    key={item.id}
                    item={item}
                    isActive={index === destination.selectedIndex}
                    update={destination.onSelectLocation}
                    close={destination.closeModal}
                />
            )))}
        </div>)
    );
};

export default DestinationModal;