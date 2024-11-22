import { formatValue } from 'react-currency-input-field'
import styles from './ProductSummary.module.css'

export default function ProductSummary({ totalPrice }) {
    return (
        <div className={styles.summary}>
            Total: {
                formatValue({
                    value: totalPrice.toString(),
                    decimalScale: 2,
                    intlConfig: {
                        locale: 'pt-BR',
                        currency: 'BRL',
                    }
                })
            }
        </div>
    )
}