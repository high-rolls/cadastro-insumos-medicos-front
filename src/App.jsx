import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useSWR, { SWRConfig } from 'swr'
import { API_URL, addProduct, deleteProduct, updateProduct } from './api'
import Header from './Header'
import ProductGrid from './ProductGrid'
import styles from './App.module.css'

const fetcher = (url) => fetch(url).then((res) => res.json())
const mutateOptions = {
  rollbackOnError: true,
  populateCache: true,
  revalidate: false,
}

function App() {
  const {
    data: products,
    error,
    isValidating,
    mutate,
  } = useSWR(API_URL + '/Insumos', fetcher, {
    revalidateOnFocus: false,
  })

  const [newProduct, setNewProduct] = useState(null)

  const handleAddProduct = () => {
    setNewProduct({
      nome: '',
      custo: 0,
      quantidade: 0
    })
  }

  const handleSaveNewProduct = async (product) => {
    try {
      await mutate([...products, addProduct(product)], {
        optimisticData: [...data, product],
        ...mutateOptions
      })
      toast.success('Produto adicionado com sucesso.')
      setNewProduct(null)
    } catch (e) {
      toast.error('Falha ao adicionar produto.')
    }
  }

  const handleCancelNewProduct = () => {
    setNewProduct(null)
  }

  const handleProductChange = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct)
      const newProducts = products.map((product) => (
        product.id === updatedProduct.id ? updatedProduct : product
      ))
      mutate(newProducts, {
        optimisticData: newProducts,
        ...mutateOptions
      })
    } catch (e) {
      toast.error('Falha ao salvar produto.')
      console.error(e)
    }
  }

  const handleProductDelete = async (id) => {
    if (confirm('Confirma a exclusão do produto?')) {
      try {
        await deleteProduct(id)
        const newProducts = products.filter((product) => product.id !== id)
        mutate(newProducts, {
          optimisticData: newProducts,
          ...mutateOptions
        })
        toast.success(`Produto ${id} excluído.`)
      } catch (e) {
        toast.error('Falha ao excluir produto.')
      }
    }
  }

  if (error) return <div className={styles.error}>Erro ao carregar</div>
  if (isValidating) return <div className={styles.loading}>Carregando dados...</div>

  return (
    <div>
      <Toaster toastOptions={{ position: 'bottom-center' }} />
      <Header onAddProduct={handleAddProduct} />
      {products &&
        <ProductGrid
          products={products.sort((a, b) => a.id - b.id)}
          newProduct={newProduct}
          onProductChange={handleProductChange}
          onCancelNewProduct={handleCancelNewProduct}
          onSaveNewProduct={handleSaveNewProduct}
          onProductDelete={handleProductDelete}
        />
      }
    </div>
  )
}

export default App
