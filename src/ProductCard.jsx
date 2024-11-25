import { forwardRef, useState, useEffect } from 'react'
import CurrencyInput, { formatValue } from 'react-currency-input-field'
import styles from './ProductCard.module.css'

const ProductCard = forwardRef(function ProductCard({
    product,
    editing = false,
    onSave,
    onCancel,
    onProductChange,
    onProductDelete
}, ref) {
    const [isEditing, setIsEditing] = useState(editing)
    const [localProduct, setLocalProduct] = useState(product)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setLocalProduct(product) // Reset product if it changes externally
    }, [product])

    const validate = () => {
        const newErrors = {}
        if (!localProduct.nome.trim())
            newErrors.nome = 'Nome não pode estar vazio.'
        if (localProduct.custo <= 0)
            newErrors.custo = 'Preço deve ser maior que 0.'
        if (localProduct.quantidade <= 0)
            newErrors.quantidade = 'Quantidade deve ser maior que 0.'
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
        <article className={styles.card} ref={ref}>
            <header className={styles.cardHeader}>
                {
                    isEditing ?
                        <label>
                            {"descrição: "}
                            <input
                                type="text"
                                value={localProduct.nome}
                                onChange={(e) =>
                                    handleChange('nome', e.target.value)
                                }
                            />
                        </label> :
                        <h2 className={styles.title}>{product.nome}</h2>
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
            {errors.nome &&
                <p className={styles.error}>{errors.nome}</p>
            }
            <ul>
                <li>
                    quantidade: {
                        isEditing ?
                            <>
                                <input
                                    type="number"
                                    value={localProduct.quantidade}
                                    onChange={
                                        (e) => handleChange(
                                            'quantidade', Number(e.target.value)
                                        )
                                    }
                                />
                                {errors.quantidade &&
                                    <p className={styles.error}>
                                        {errors.quantidade}
                                    </p>
                                }
                            </> :
                            product.quantidade
                    }
                </li>
                <li>
                    preço: {
                        isEditing ?
                            <>
                                <CurrencyInput
                                    decimalsLimit={2}
                                    intlConfig={{
                                        locale: 'pt-BR',
                                        currency: 'BRL'
                                    }}
                                    defaultValue={localProduct.custo}
                                    onValueChange={
                                        (_value, _name, values) => {
                                            handleChange(
                                                'custo', values.float
                                            )
                                        }
                                    }
                                />
                                {errors.custo &&
                                    <p className={styles.error}>
                                        {errors.custo}
                                    </p>
                                }
                            </> :
                            formatValue({
                                value: product.custo.toString(),
                                decimalScale: 2,
                                intlConfig: {
                                    locale: 'pt-BR',
                                    currency: 'BRL',
                                }
                            })
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
})

export default ProductCard
