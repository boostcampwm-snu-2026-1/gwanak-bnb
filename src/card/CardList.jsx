import Card from "./Card";
import styles from "../css/CardList.module.css";

function CardList({ cards }) {
  return (
    <div className={styles.cardList}>
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.name}
          description={card.description}
          imageUrl={card.images?.[0]}
        />
      ))}
    </div>
  );
}

export default CardList;