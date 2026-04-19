import styles from "../css/Card.module.css";


function Card({ title, description, imageUrl }) {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles["card-image"]} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
}

export default Card;