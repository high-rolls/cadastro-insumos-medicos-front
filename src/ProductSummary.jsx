import styles from './ProductSummary.module.css'
import { asCurrency } from './utils/numbers'

export default function ProductSummary({ totalPrice }) {
    return (
        <div className={styles.summary}>
            Total: {asCurrency(totalPrice)}
        </div>
    )
}