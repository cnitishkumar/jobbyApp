import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome} from 'react-icons/io'
import {MdLogout} from 'react-icons/md'

import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-desktop">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-website-logo"
            alt="website logo"
          />
        </Link>
        <ul className="nav-ul-el">
          <li className="nav-li-el">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-li-el">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="nav-logout-button-desktop"
          onClick={onClickLogoutBtn}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
