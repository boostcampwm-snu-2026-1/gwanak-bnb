function DestinationSetModal({ queryDestination, setDestination }) {
  return (
    <div>
      {queryDestination.map((item) => (
        <button key={item.name} onClick={() => setDestination(item.name)}>
          <div>{item.name}</div>
          <div>{item.country}</div>
          <div>{item.description}</div>
        </button>
      ))}
    </div>
  );
}

export default DestinationSetModal;