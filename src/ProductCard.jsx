import { useState, useEffect } from 'react'
import styles from './ProductCard.module.css'
import { asCurrency } from './utils/numbers'

export default function ProductCard({
    product,
    isEditing,
    onEditToggle,
    onSave,
    onCancel
}) {
    const [draft, setDraft] = useState({ ...product })

    useEffect(() => {
        setDraft({ ...product }) // Reset draft if product changes externally
    }, [product])

    const handleChange = (field, value) => {
        setDraft((prev) => ({ ...prev, [field]: value }))
    }

    const handleConfirm = () => {
        onSave(draft)
    }

    const handleCancel = () => {
        setDraft({ ...product })
        onCancel()
    }

    return (
        <article className={styles.card}>
            <header className={styles.cardHeader}>
                {
                    isEditing ?
                        <input
                            type="text"
                            value={draft.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        /> :
                        <h2 className={styles.title}>{product.name}</h2>
                }
                {!isEditing &&
                    <div className={styles.actionBar}>
                        <a
                            href="#"
                            className={styles.actionLink}
                            onClick={onEditToggle}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </a>
                        <a href="#" className={styles.actionLinkDelete}>
                            <i className="bi bi-x-lg"></i>
                        </a>
                    </div>
                }
            </header>
            <ul>
                <li>
                    quantidade: {
                        isEditing ?
                            <input
                                type="number"
                                value={draft.quantity}
                                onChange={
                                    (e) => handleChange(
                                        'quantity', Number(e.target.value)
                                    )
                                }
                            /> :
                            product.quantity
                    }
                </li>
                <li>
                    preço: {
                        isEditing ?
                            <input
                                type="number"
                                value={draft.price}
                                onChange={
                                    (e) => handleChange(
                                        'price', Number(e.target.value)
                                    )
                                }
                            /> :
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