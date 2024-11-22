import cimLogo from './assets/cim.svg'
import styles from './Header.module.css'

export default function Header({ onAddProduct }) {
  return (
    <header className={styles.headerBar}>
      <img className={styles.logo} src={cimLogo} alt="Logo CIM" />
      <button className={styles.button} type="button" onClick={onAddProduct}>
        Cadastrar <i className="bi bi-plus-lg"></i>
      </button>
    </header>
  )
}