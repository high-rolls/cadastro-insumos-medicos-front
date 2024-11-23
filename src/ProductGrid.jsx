import { useMemo } from 'react'
import ProductCard from './ProductCard'
import ProductSummary from './ProductSummary'
import styles from './ProductGrid.module.css'

export default function ProductGrid({
    products,
    newProduct,
    onProductChange,
    onSaveNewProduct,
    onCancelNewProduct,
    onProductDelete,
}) {
    const totalPrice = useMemo(
        () => (products.reduce((accumulator, item) =>
            (accumulator + item.price * item.quantity), 0
        )),
        [products]
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
                            onProductChange(updatedProduct, index)
                        }
                        onProductDelete={() =>
                            onProductDelete(index)
                        }
                    />
                ))}
                {newProduct && (
                    <ProductCard
                        product={newProduct}
                        editing={true}
                        onSave={onSaveNewProduct}
                        onCancel={onCancelNewProduct}
                    />
                )}
            </div>
        </section>
    )
}
