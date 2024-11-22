import { useState } from 'react'
import Header from './Header'
import ProductGrid from './ProductGrid'

function App() {
  const [products, setProducts] = useState(PRODUCTS)
  const [newProduct, setNewProduct] = useState(null)

  const handleAddProduct = () => {
    setNewProduct({
      name: '',
      price: 0,
      quantity: 0
    })
  }

  const handleSaveNewProduct = (product) => {
    setProducts([...products, product])
    setNewProduct(null)
  }

  const handleCancelNewProduct = () => {
    setNewProduct(null)
  }

  const handleProductChange = (updatedProduct, index) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        (i === index ? updatedProduct : product)
      )
    )
  }

  return (
    <>
      <Header onAddProduct={handleAddProduct} />
      <ProductGrid
        products={products}
        newProduct={newProduct}
        onProductChange={handleProductChange}
        onCancelNewProduct={handleCancelNewProduct}
        onSaveNewProduct={handleSaveNewProduct}
      />
    </>
  )
}

const PRODUCTS = [
  {
    name: 'Seringa 20ml',
    quantity: 20,
    price: 4.9
  },
  {
    name: 'Agulha 0.3mm',
    quantity: 15,
    price: 3.99
  }
]

export default App
