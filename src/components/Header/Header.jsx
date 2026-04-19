import SearchBarContainer from '../SearchBar/SearchBarContainer';
import './Header.css';

function Header({ onSearch }){
    return(
        <header className='header'>
            <div className='header-top'>
                <div className = 'header-logo'>
                    <span className='logo-text'>gwanakbnb</span>
                </div>

            </div>
            <SearchBarContainer onSearch={onSearch} />
        </header>
    );
}

export default Header;