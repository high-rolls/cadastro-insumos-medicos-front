export const API_URL = 'https://api-render-dhmg.onrender.com/api'

export async function addProduct(product) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    }
    const response = await fetch(API_URL + '/Insumos', options)
    const data = await response.json()
    return data
}

export async function deleteProduct(id) {
    const options = {
        method: 'DELETE',
    }

    const response = await fetch(`${API_URL}/Insumos/${id}`, options)
}

export async function updateProduct(product) {
    const bodyProduct = { ...product }
    bodyProduct.id.delete
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyProduct)
    }
    const response = await fetch(`${API_URL}/Insumos/${product.id}`, options)
}