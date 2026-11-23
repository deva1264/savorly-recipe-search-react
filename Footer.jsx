import { Sprout, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-inner">
      <Link to="/" className="brand footer-brand"><span className="brand-mark"><Sprout size={17}/></span><span>savorly<span className="brand-dot">.</span></span></Link>
      <p>Made for curious cooks and beautiful little moments.</p>
      <span className="footer-note">A little love in every recipe <Heart size={13} fill="currentColor"/></span>
    </div>
  </footer>
}
