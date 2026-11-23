import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import Favourites from './pages/Favourites'
import './styles.css'

export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  return <div className="app-shell">
    <Navbar />
    <main className="page-main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*" element={<div className="not-found wrap"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>Looks like this recipe went missing.</h1><a className="button button-dark" href="/">Back home</a></div>} />
      </Routes>
    </main>
    <Footer />
  </div>
}
