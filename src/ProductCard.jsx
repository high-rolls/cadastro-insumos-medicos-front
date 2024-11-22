import { useState, useEffect } from 'react'
import styles from './ProductCard.module.css'
import { asCurrency } from './utils/numbers'

export default function ProductCard({
    product,
    editing = false,
    onSave,
    onCancel,
    onProductChange,
    onProductDelete
}) {
    const [isEditing, setIsEditing] = useState(editing)
    const [localProduct, setLocalProduct] = useState(product)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setLocalProduct(product) // Reset local product if product changes externally
    }, [product])

    const validate = () => {
        const newErrors = {}
        if (!localProduct.name.trim())
            newErrors.name = 'Nome não pode estar vazio.'
        if (localProduct.price <= 0)
            newErrors.price = 'Preço deve ser maior que 0.'
        if (localProduct.quantity <= 0)
            newErrors.quantity = 'Quantidade deve ser maior que 0.'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (field, value) => {
        setLocalProduct((prev) => ({ ...prev, [field]: value }))
    }

    const handleConfirm = () => {
        if (!validate()) {
            return
        }
        setIsEditing(false)
        if (onSave) {
            onSave(localProduct)
        } else if (onProductChange) {
            onProductChange(localProduct)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setLocalProduct(product)
        setErrors({})
        if (onCancel) {
            onCancel()
        }
    }

    return (
        <article className={styles.card}>
            <header className={styles.cardHeader}>
                {
                    isEditing ?
                        <input
                            type="text"
                            value={localProduct.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        /> :
                        <h2 className={styles.title}>{product.name}</h2>
                }
                {!isEditing &&
                    <div className={styles.actionBar}>
                        <a
                            href="#"
                            className={styles.actionLink}
                            onClick={(e) => {
                                e.preventDefault()
                                setIsEditing(true)
                            }}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </a>
                        <a
                            href="#"
                            className={styles.actionLinkDelete}
                            onClick={(e) => {
                                e.preventDefault()
                                onProductDelete()
                            }}
                        >
                            <i className="bi bi-x-lg"></i>
                        </a>
                    </div>
                }
            </header>
            {errors.name &&
                <p className={styles.error}>{errors.name}</p>
            }
            <ul>
                <li>
                    quantidade: {
                        isEditing ?
                            <>
                                <input
                                    type="number"
                                    value={localProduct.quantity}
                                    onChange={
                                        (e) => handleChange(
                                            'quantity', Number(e.target.value)
                                        )
                                    }
                                />
                                {errors.quantity &&
                                    <p className={styles.error}>{errors.quantity}</p>
                                }
                            </> :
                            product.quantity
                    }
                </li>
                <li>
                    preço: {
                        isEditing ?
                            <>
                                <input
                                    type="number"
                                    value={localProduct.price}
                                    onChange={
                                        (e) => handleChange(
                                            'price', Number(e.target.value)
                                        )
                                    }
                                />
                                {errors.price &&
                                    <p className={styles.error}>{errors.price}</p>
                                }
                            </>
                            :
                            asCurrency(product.price)
                    }
                </li>
            </ul>
            {isEditing &&
                <div className={styles.bottomActionBar}>
                    <button
                        type="button"
                        className={styles.actionButton}
                        onClick={handleConfirm}
                    >
                        <i className="bi bi-check-lg"></i>
                    </button>
                    <button
                        type="button"
                        className={
                            `${styles.actionButton} ${styles.cancelButton}`
                        }
                        onClick={handleCancel}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
            }
        </article>
    )
}