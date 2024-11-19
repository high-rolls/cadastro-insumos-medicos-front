import cimLogo from './assets/cim.svg'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.headerBar}>
      <img className={styles.logo} src={cimLogo} alt="Logo CIM" />
      <button className={styles.button} type="button">Cadastrar</button>
    </header>
  )
}