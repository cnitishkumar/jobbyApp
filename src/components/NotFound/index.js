import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div>
    <Link to="/not-found" className="link-el">
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="not-found-image"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="failure-description">
          we are sorry, the page you requested could not be found
        </p>
      </div>
    </Link>
  </div>
)
export default NotFound
