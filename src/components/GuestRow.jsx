function GuestRow({ title, description, count, onIncrease, onDecrease }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <div>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: '#717171' }}>{description}</div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button 
          onClick={onDecrease}
          style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #b0b0b0', backgroundColor: 'white', cursor: 'pointer' }}
        >
          -
        </button>
        <span style={{ width: '20px', textAlign: 'center' }}>{count}</span>
        <button 
          onClick={onIncrease}
          style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #b0b0b0', backgroundColor: 'white', cursor: 'pointer' }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default GuestRow;