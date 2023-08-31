import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-background-image">
      <div className="border">
        <div className="central-container">
          <h1>WELCOME TO THE MOVIE DATABASE</h1>
          <Link to="/films" className="hover-underline-animation">
            GO TO FILMS AREA
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
