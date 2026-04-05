import './SearchField.css';

function SearchField(label, placeholder, isActive, onClick, value) {
    return (
        <div className={`search-field ${isActive ? 'active' : ''}`} onClick={onClick}>
            <span className="search-field-label">{label}</span>
            <span className={`search-field-value ${value ? '' : 'placeholder'}`}>{value || placeholder}</span>
        </div>
    );
}
export default SearchField;