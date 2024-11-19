import { asCurrency } from './utils/numbers'

export default function ProductCard({ product }) {
    return (
        <article className="card">
            <h2>{product.name}</h2>
            <ul>
                <li>quantidade: {product.quantity}</li>
                <li>preço: {asCurrency(product.price)}
                </li>
            </ul>
        </article>
    )
}