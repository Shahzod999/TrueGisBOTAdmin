import styles from "./FotoTextHint.module.scss";

interface FotoTextHintProps {
  image: string;
  title: string;
  address: string;
}

const FotoTextHint = ({ image, title, address }: FotoTextHintProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.address}>{address}</p>
      </div>
    </div>
  );
};

export default FotoTextHint;
