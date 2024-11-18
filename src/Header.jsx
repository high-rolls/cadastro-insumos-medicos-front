import cimLogo from './assets/cim.svg'
import './Header.css'

export default function Header() {
  return (
    <header>
      <img src={cimLogo} alt="Logo CIM" />
      <button type="button">Cadastrar</button>
    </header>
  )
}