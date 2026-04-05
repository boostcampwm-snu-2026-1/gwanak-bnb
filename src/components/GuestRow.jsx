function GuestRow({ title, description, count, onIncrease, onDecrease, isMin, isMax }) {

  // 비활성화 시 사용할 공통 스타일
  const buttonStyle = (isDisabled) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: `1px solid #b0b0b0`,
    backgroundColor: 'white',
    cursor: isDisabled ? 'not-allowed' : 'pointer', // 클릭 불가 표시
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    opacity: isDisabled ? 0.3 : 1,
    pointerEvents: isDisabled ? 'none' : 'auto',
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <div>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: '#717171' }}>{description}</div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button 
          onClick={onDecrease}
          disabled={isMin}
          style={buttonStyle(isMin)}
        >
          -
        </button>

        <span style={{ width: '20px', textAlign: 'center' }}>{count}</span>

        <button 
          onClick={onIncrease} 
          disabled={isMax} 
          style={buttonStyle(isMax)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default GuestRow;