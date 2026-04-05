import './SearchField.css';

function SearchField({ label, placeholder, isActive, onClick, value, children }) {
    return (
        <div className={`search-field ${isActive ? 'active' : ''}`} onClick={onClick}>
            <span className="search-field-label">{label}</span>
            <span className={`search-field-value ${value ? '' : 'placeholder'}`}>{value || placeholder}</span>
            {children}
        </div>
    );
}
export default SearchField;