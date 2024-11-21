import { useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductManager({ initialProduct, onProductChange }) {
    const [product, setProduct] = useState(initialProduct)
    const [isEditing, setIsEditing] = useState(false)

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev)
    }

    const handleSave = (updatedProduct) => {
        setProduct(updatedProduct) // Save the updated product state
        setIsEditing(false)
        onProductChange(updatedProduct)
        // Optionally, call an API to persist changes
    }

    const handleCancel = () => {
        setIsEditing(false) // Revert to non-editing mode without changes
    }

    return (
        <ProductCard
            product={product}
            isEditing={isEditing}
            onEditToggle={handleEditToggle}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    )
}
