function GuestCounter({ label, description, count, onChange }) {
  return (
    <div>
      <div>
        <span>{label}</span>
        <span>{description}</span>
      </div>
      <div>
        <button onClick={() => onChange(count - 1)} disabled={count <= 0}>
          -
        </button>
        <span>{count}</span>
        <button onClick={() => onChange(count + 1)}>+</button>
      </div>
    </div>
  );
}

export default GuestCounter;
