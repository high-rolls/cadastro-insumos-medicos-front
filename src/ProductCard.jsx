import styles from './ProductCard.module.css'
import { asCurrency } from './utils/numbers'

export default function ProductCard({ product }) {
    return (
        <article className={styles.card}>
            <header className={styles.cardHeader}>
                <h2 className={styles.title}>{product.name}</h2>
                <div className={styles.actionButtons}>
                    <a href="#" className={styles.actionButton}>
                        <i className="bi bi-pencil-square"></i>
                    </a>
                    <a href="#" className={styles.actionButtonDelete}>
                        <i className="bi bi-x-lg"></i>
                    </a>
                </div>
            </header>
            <ul>
                <li>quantidade: {product.quantity}</li>
                <li>preço: {asCurrency(product.price)}
                </li>
            </ul>
        </article>
    )
}