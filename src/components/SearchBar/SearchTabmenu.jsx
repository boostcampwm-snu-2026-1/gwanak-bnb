import './SearchTabMenu.css';
import {useState} from 'react';

function SearchTabMenu(){
    const [activeTab, setActiveTab] = useState('stays');
    return(
        <div className="search-tab-menu">
            <button className={`tab-btn ${activeTab === 'stays' ? 'active' : ''}`} onClick={() => setActiveTab('stays')}>숙소</button>
            <button className={`tab-btn ${activeTab === 'experiences' ? 'active' : ''}`} onClick={() => setActiveTab('experiences')}>체험</button>
        </div>
    );
}

export default SearchTabMenu;