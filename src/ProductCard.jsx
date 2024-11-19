import { useState } from 'react'
import styles from './ProductCard.module.css'
import { asCurrency } from './utils/numbers'

export default function ProductCard({ product }) {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(product.name)

    const handleEditClicked = (event) => {
        setIsEditing(!isEditing)
    }

    return (
        <article className={styles.card}>
            <header className={styles.cardHeader}>
                {
                    isEditing ?
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        /> :
                        <h2 className={styles.title}>{name}</h2>
                }
                {!isEditing &&
                    <div className={styles.actionBar}>
                        <a
                            href="#"
                            className={styles.actionLink}
                            onClick={handleEditClicked}
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
                <li>quantidade: {product.quantity}</li>
                <li>preço: {asCurrency(product.price)}
                </li>
            </ul>
            <div className={styles.bottomActionBar}>
                <button type="button" className={styles.actionButton}>
                    <i className="bi bi-check-lg"></i>
                </button>
            </div>
        </article>
    )
}