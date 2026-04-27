function DestinationRow({ item, destination, isActive, update, close }) {

    return (
        <div 
            className='destination-option'
            onClick={(e) => {
                e.stopPropagation();
                console.log(destination);
                update(item);
                close();
            }}
        >
            <div className={`destination-row ${isActive ? 'active' : ''}`}>
                <div className='loc-icon'><i className={item.icon}></i></div>
                <div className='loc-desc'>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                </div>
            </div>
        </div>
    );
};

export default DestinationRow;