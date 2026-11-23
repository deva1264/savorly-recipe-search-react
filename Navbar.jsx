import { NavLink, Link } from 'react-router-dom'
import { Heart, Sprout } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

export default function Navbar() {
  const { favorites } = useFavorites()
  const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`
  return <header className="site-header">
    <div className="nav-inner wrap">
      <Link to="/" className="brand" aria-label="Savorly home">
        <span className="brand-mark"><Sprout size={19} strokeWidth={2.2} /></span>
        <span>savorly<span className="brand-dot">.</span></span>
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end className={navClass}>Home</NavLink>
        <NavLink to="/recipes" className={navClass}>Explore recipes</NavLink>
        <NavLink to="/favourites" className={navClass}>Favourites <span className="nav-count">{favorites.length}</span></NavLink>
      </nav>
      <Link to="/favourites" className="mobile-heart" aria-label="Favourites"><Heart size={20}/><span>{favorites.length}</span></Link>
    </div>
  </header>
}
