function SearchResultRow({ room }) {
    return (
        <div className="room-card">
             <div className="room-image">
                {room.images && room.images[0] ? (
                    <img src={room.images[0]} alt={room.title} />
                ) : (
                    <div className="no-image">이미지 없음</div>
                )}
            </div>
            <div className="room-info">
                <div className="room-header">
                    <h4>{room.title}</h4>
                    <p className="room-type">{room.roomType}</p>
                </div>
                <p className="room-desc">{room.description}</p>
                <div className="room-footer">
                    <p className="room-price">
                        <strong>₩{room.price?.toLocaleString()}</strong> / 박
                    </p>
                    <p className="room-capacity">최대 인원 {room.capacity?.maxGuests}명</p>
                </div>
            </div>
        </div>
    );
}

export default SearchResultRow;