import './SearchField.css';

function SearchField({ label, placeholder, isActive, onClick, value, onInputChange, inputValue, children }) {
    return (
        <div className={`search-field ${isActive ? 'active' : ''}`} onClick={onClick}>
            <span className="search-field-label">{label}</span>
            {onInputChange ? (
                <input
                    className="search-field-input"
                    value={inputValue}
                    onChange={onInputChange}
                    placeholder={placeholder}
                />
            ) : (
                <span className={`search-field-value ${value ? '' : 'placeholder'}`}>{value || placeholder}</span>
            )}
            {children}
        </div>
    );
}
export default SearchField;