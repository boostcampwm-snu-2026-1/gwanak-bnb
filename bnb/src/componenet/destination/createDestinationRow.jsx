function DestinationRow({ iconClass, destination, desc }) {

    return (
        <div className='destination-option'>
            <div className='destination-row'>
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