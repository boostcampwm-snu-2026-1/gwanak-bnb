import Card from "./Card";

function CardList({ cards }) {
  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
        />
      ))}
    </div>
  );
}

export default CardList;