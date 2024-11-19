import { useState } from 'react'
import Header from './Header'
import ProductGrid from './ProductGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <ProductGrid products={PRODUCTS} />
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
