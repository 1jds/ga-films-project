import { Link } from 'react-router-dom'
import './Error.css'

function Error() {
  return (
    <div className="error-background-image">
      <div className="border">
        <div className="central-container">
          <h1>Error 404!</h1>
          <p>Uh oh, that page doesn't exist.</p>
          <Link to="/films" className="hover-underline-animation">
            Go back to films
          </Link>
          <Link to="/" className="hover-underline-animation">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error
