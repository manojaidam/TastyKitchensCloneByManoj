import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {useState} from 'react'
// import {motion} from 'framer-motion'
import './index.css'
import NavLinks from '../NavLinks'

const MobileNavigation = () => {
  const [open, setOpen] = useState(false)

  const hamburgerIcon = (
    <GiHamburgerMenu
      className="Hamburger"
      size="35px"
      onClick={() => setOpen(!open)}
    />
  )
  const closeIcon = (
    <AiOutlineCloseCircle
      className="Hamburger"
      size="35px"
      onClick={() => setOpen(!open)}
    />
  )

  const closeMobileMenu = () => setOpen(false)
  return (
    <nav className="MobileNavigation">
      {open ? closeIcon : hamburgerIcon}
      {open && <NavLinks isMobile="true" closeMobileMenu={closeMobileMenu} />}
    </nav>
  )
}
export default MobileNavigation
