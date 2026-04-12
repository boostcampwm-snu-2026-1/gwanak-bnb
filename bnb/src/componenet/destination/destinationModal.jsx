import './destination.css'
import { useSearch } from '../../context/searchContext';
import DestinationRow from './createDestinationRow';

function DestinationModal() {
    const { isOpenDestination, destination } = useSearch();

    return (
        isOpenDestination && (<div className='modal-destination'>
            {destination.displayList.map((item => (
                <DestinationRow 
                    key={item.id}
                    iconClass={item.icon}
                    destination={item.title}
                    desc={item.desc}
                />
            )))}
        </div>)
    );
};

export default DestinationModal;