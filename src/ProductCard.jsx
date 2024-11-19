import styles from './ProductCard.module.css'
import { asCurrency } from './utils/numbers'

export default function ProductCard({ product }) {
    return (
        <article className={styles.card}>
            <h2 className={styles.title}>{product.name}</h2>
            <ul>
                <li>quantidade: {product.quantity}</li>
                <li>preço: {asCurrency(product.price)}
                </li>
            </ul>
        </article>
    )
}