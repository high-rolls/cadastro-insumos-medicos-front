import { forwardRef, useEffect, useMemo, useRef } from 'react'
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
    const newProductRef = useRef(null)

    const totalPrice = useMemo(
        () => (products.reduce((accumulator, item) =>
            (accumulator + item.custo * item.quantidade), 0
        )),
        [products]
    )

    useEffect(() => {
        if (newProductRef.current) {
            newProductRef.current.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }, [newProduct])

    return (
        <section>
            <ProductSummary totalPrice={totalPrice} />
            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductChange={(updatedProduct) =>
                            onProductChange(updatedProduct)
                        }
                        onProductDelete={() =>
                            onProductDelete(product.id)
                        }
                    />
                ))}
                {newProduct && (
                    <ProductCard
                        product={newProduct}
                        editing={true}
                        onSave={onSaveNewProduct}
                        onCancel={onCancelNewProduct}
                        ref={newProductRef}
                    />
                )}
            </div>
        </section>
    )
}
