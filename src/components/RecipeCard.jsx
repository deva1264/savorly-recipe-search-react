import { Link } from 'react-router-dom'
import { Heart, ArrowUpRight } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

export default function RecipeCard({ recipe, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(recipe.idMeal)
  return <article className="recipe-card" style={{ animationDelay: `${index * 65}ms` }}>
    <div className="card-image-wrap">
      <Link to={`/recipes/${recipe.idMeal}`} className="card-image-link" aria-label={`View ${recipe.strMeal}`}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy"/>
      </Link>
      <button className={`save-button${saved ? ' saved' : ''}`} onClick={() => toggleFavorite(recipe)} aria-label={saved ? 'Remove from favourites' : 'Save to favourites'} title={saved ? 'Remove from favourites' : 'Save to favourites'}>
        <Heart size={17} fill={saved ? 'currentColor' : 'none'}/>
      </button>
      <span className="image-index">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="card-copy">
      <div className="card-meta"><span>{recipe.strCategory || 'Kitchen favourite'}</span><span className="meta-dot"/></div>
      <Link to={`/recipes/${recipe.idMeal}`} className="card-title">{recipe.strMeal}</Link>
      <Link to={`/recipes/${recipe.idMeal}`} className="card-arrow" aria-label={`Open ${recipe.strMeal}`}><ArrowUpRight size={17}/></Link>
    </div>
  </article>
}
