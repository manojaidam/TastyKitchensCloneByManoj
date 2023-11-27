import {withRouter, Link} from 'react-router-dom'
import MobileNavigation from '../MobileNavigation'
import Navigation from '../Navigation'

import './index.css'

const logoUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg'

const NavBar = () => (
  <div className="NavBar">
    <Link to="/" style={{textDecoration: 'none'}}>
      <div className="LogoContainer">
        <img src={logoUrl} alt="website logo" className="LogoImage" />
        <h1 className="MainHeading">Tasty Kitchens</h1>
      </div>
    </Link>
    <Navigation />
    <MobileNavigation />
  </div>
)

export default withRouter(NavBar)
