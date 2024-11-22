import { useState } from 'react'
import ProductCard from './ProductCard'
import ProductSummary from './ProductSummary'
import styles from './ProductGrid.module.css'

export default function ProductGrid({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts)

    const handleProductChange = (updatedProduct, index) => {
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                (i === index ? updatedProduct : product)
            )
        )
    }

    const totalPrice = products.reduce((accumulator, item) =>
        (accumulator + item.price), 0
    )

    return (
        <section>
            <ProductSummary totalPrice={totalPrice} />
            <div className={styles.grid}>
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        product={product}
                        onProductChange={(updatedProduct) =>
                            handleProductChange(updatedProduct, index)
                        }
                    />
                ))}
            </div>
        </section>
    )
}
