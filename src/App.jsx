import { useState } from 'react'
import { asCurrency } from './utils/numbers.js'
import Header from './Header'
import './App.css'

function ProductSummary({ totalPrice }) {
  return (
    <div className="summary">
      Total: { asCurrency(totalPrice) }
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <article className="card">
      <h2>{product.name}</h2>
      <ul>
        <li>quantidade: {product.quantity}</li>
        <li>preço: { asCurrency(product.price) }
        </li>
      </ul>
    </article>
  )
}

function ProductGrid({ products }) {
  const productCards = products.map((product) => {
    return <ProductCard product={product} />
  })
  const totalPrice = products.reduce((accumulator, item) => {
    return accumulator + item.price
  }, 0);
  console.log(totalPrice);

  return (
    <section>
      <ProductSummary totalPrice={totalPrice} />
      <div className="grid">
        {productCards}
      </div>
    </section>
  );
}

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
];

export default App
