import './destination.css'
import { useSearch } from '../../context/searchContext'

function DestinationSearch() {
    const { isOpenDestination, onToggleDestination } = useSearch();
    return (
        <div 
            className={`search ${isOpenDestination ? 'active-left' : ''}`}
            onClick={onToggleDestination}
        >
            <div>
                <h6>여행지</h6>
                <form className='input-dest'>
                    <input className='onhover' placeholder='여행지 검색'/>
                </form>
            </div>
            <div className='divider-right'></div>
        </div>
    )
}

export default DestinationSearch