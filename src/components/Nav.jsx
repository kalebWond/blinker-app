import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Nav() {
  function toggleMenu() {
    document.body.classList.toggle('menu--open');
  }
  return (
    <nav>
        <Link to="/"><img src={Logo} alt="@site-logo" className="site-logo" /></Link>
        <ul className="menu">
          <li className="menu__item"><Link to="/" className="link__anchor hover-effect">Home</Link></li>
          <li className="menu__item"><Link to="/movies" className="link__anchor hover-effect">Find movies</Link></li>
          <li className="menu__item"><Link to="/" className="link__anchor link__anchor--primary">Contact</Link></li>
        </ul>
        <button className="btn__menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon="bars" />
        </button>
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={toggleMenu}>
            <FontAwesomeIcon icon="times" />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link" onClick={toggleMenu}>Home</Link>
            </li>
            <li className="menu__list">
              <Link to="/movies" className="menu__link" onClick={toggleMenu}>Find movies</Link>
            </li>
            <li className="menu__list">
              <Link to="/" className="link__anchor link__anchor--primary" onClick={toggleMenu}>Contacts</Link>
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default Nav