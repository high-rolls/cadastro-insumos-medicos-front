import ProductCard from './ProductCard'
import ProductSummary from './ProductSummary'
import styles from './ProductGrid.module.css'

export default function ProductGrid({ products }) {
    const productCards = products.map((product) => {
        return <ProductCard product={product} />
    })
    const totalPrice = products.reduce((accumulator, item) => {
        return accumulator + item.price
    }, 0)
    console.log(totalPrice)

    return (
        <section>
            <ProductSummary totalPrice={totalPrice} />
            <div className={styles.grid}>
                {productCards}
            </div>
        </section>
    )
}
