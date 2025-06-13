import React, { useState } from 'react'
import Nav from './Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header({searchMovies, initSearch, isLoading}) {
    const [value, setValue] = useState(initSearch || '')
  
  return (
    <header className="header">
     <div className="row">
      <Nav />
     </div>
      <div className="header__content">
        <h1 className="header__title">Browse our Movies</h1>
        <form onSubmit={(e) => {e.preventDefault(); searchMovies(value)}} className="form">
          <div className="input__wrapper">
            <input value={value} onChange={e => setValue(e.target.value)} type="text" className="form__input" id="search-input" name="movie_search" placeholder="Search by Title . . ." />
            <button className="form__submit">
              {isLoading ? <FontAwesomeIcon className="spinner-btn" icon="spinner" /> : <FontAwesomeIcon icon="search" />}
            </button>
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header