import { ArrowLeft } from "react-feather";
import './Header.scss'
export default function Header() {
  return (
    <header className='header__container'>
      <div className="header__container__title">
        <ArrowLeft />
        <h1 className='header__title'>Github Events</h1>

      </div>
      <hr />

    </header>

  )
}