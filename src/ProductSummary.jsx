import { asCurrency } from './utils/numbers'

export default function ProductSummary({ totalPrice }) {
    return (
        <div className="summary">
            Total: {asCurrency(totalPrice)}
        </div>
    )
}