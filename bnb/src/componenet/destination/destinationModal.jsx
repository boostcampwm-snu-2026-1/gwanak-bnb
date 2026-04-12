import './destination.css'
import { useSearch } from '../../context/searchContext';
import DestinationRow from './createDestinationRow';
import { RECOMMENDATIONS } from '../../data/recommendation';

function DestinationModal() {
    const { isOpenDestination, searchTerm } = useSearch();
    return (
        isOpenDestination && (<div className='modal-destination'>
            {!searchTerm ? (
                RECOMMENDATIONS.map(item => <DestinationRow 
                    iconClass={item.icon}
                    destination={item.title}
                    desc={item.desc}
                />)
            ) : ''}
        </div>)
    );
};

export default DestinationModal;