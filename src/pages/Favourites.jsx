import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import RecipeGrid from '../components/RecipeGrid'

export default function Favourites() {
  const { favorites } = useFavorites()
  return <div className="inner-page wrap favourites-page">
    <div className="page-intro">
      <span className="eyebrow"><span className="eyebrow-line"/> YOUR PERSONAL RECIPE BOOK</span>
      <h1>Kept with <em>love.</em></h1>
      <p>The recipes you saved for a rainy day, a special dinner, or simply because they looked delicious.</p>
    </div>
    <div className="favourites-summary"><span className="favourites-heart"><Heart size={20} fill="currentColor"/></span><div><strong>{favorites.length} saved {favorites.length === 1 ? 'recipe' : 'recipes'}</strong><span>Your little collection, all in one place.</span></div></div>
    {favorites.length ? <RecipeGrid recipes={favorites}/> : <div className="state-panel favourites-empty"><span className="state-emoji">♡</span><h3>Your recipe book is waiting.</h3><p>When a recipe catches your eye, tap the little heart to keep it close. It will be right here when you need it.</p><Link to="/recipes" className="button button-dark">Discover recipes <ArrowRight size={16}/></Link></div>}
  </div>
}
