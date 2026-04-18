function DestinationRow({ iconClass, destination, desc, isActive, update, close }) {

    return (
        <div 
            className='destination-option'
            onClick={(e) => {
                e.stopPropagation();
                console.log(destination);
                update(destination);
                close();
            }}
        >
            <div className={`destination-row ${isActive ? 'active' : ''}`}>
                <div className='loc-icon'><i className={iconClass}></i></div>
                <div className='loc-desc'>
                    <h4>{destination}</h4>
                    <p>{desc}</p>
                </div>
            </div>
        </div>
    );
};

export default DestinationRow;