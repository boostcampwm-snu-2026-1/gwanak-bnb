import './RoomCard.css';

function RoomCard({ room }) {
  const formatPrice = (price) => price.toLocaleString();

  return (
    <div className="room-card">
      <div className="image-container">
        <img src={room.imageUrl} alt={room.title} />
        {room.isGuestFavorite && <span className="badge">게스트 선호</span>}
      </div>
      
      <div className="room-info">
        <div className="info-header">
          <h3 className="location">{room.locationShort}</h3>
          <div className="rating">
            <span>★</span>
            <span>{room.rating}</span>
          </div>
        </div>
        
        <p className="type-desc">{room.type} · 침대 {room.beds}개</p>
        <p className="available-date">{room.availableDates}</p>
        
        <div className="price-container">
          <span className="price">₩{formatPrice(room.pricePerNight)}</span>
          <span className="unit"> /박</span>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;