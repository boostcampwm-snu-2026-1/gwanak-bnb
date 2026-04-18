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
                    iconClass={item.icon}
                    destination={item.title}
                    desc={item.desc}
                    isActive={index === destination.selectedIndex}
                    update={destination.onSearchChange}
                    close={destination.closeModal}
                />
            )))}
        </div>)
    );
};

export default DestinationModal;