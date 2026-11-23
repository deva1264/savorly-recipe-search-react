import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, ArrowUpRight, Clock3, Heart, MapPin, PlayCircle } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { getIngredients, getInstructions } from '../utils/recipe'
import Loading from '../components/Loading'

const API = 'https://www.themealdb.com/api/json/v1/1'

export default function RecipeDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    const controller = new AbortController()
    async function loadMeal() {
      setLoading(true); setError('')
      try {
        const response = await axios.get(`${API}/lookup.php`, { params: { i: id }, signal: controller.signal })
        const result = response.data.meals?.[0]
        if (!result) throw new Error('Recipe not found')
        setMeal(result)
      } catch (err) {
        if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') setError('We could not find this recipe. Please return to the collection and try another.')
      } finally { if (!controller.signal.aborted) setLoading(false) }
    }
    loadMeal()
    return () => controller.abort()
  }, [id])

  if (loading) return <div className="wrap detail-loading"><Loading label="Opening the recipe book"/></div>
  if (error || !meal) return <div className="wrap state-panel detail-error"><span>!</span><h2>Recipe unavailable</h2><p>{error}</p><Link className="button button-dark" to="/recipes">Back to recipes</Link></div>

  const ingredients = getIngredients(meal)
  const instructions = getInstructions(meal)
  const saved = isFavorite(meal.idMeal)
  return <div className="detail-page wrap">
    <Link to="/recipes" className="back-link"><ArrowLeft size={16}/> Back to recipes</Link>
    <div className="detail-hero">
      <div className="detail-photo"><img src={meal.strMealThumb} alt={meal.strMeal}/><span className="photo-tag">SAVORLY SELECTS</span></div>
      <div className="detail-intro">
        <span className="eyebrow">{meal.strArea || 'GLOBAL'} CUISINE <span className="meta-dot"/> {meal.strCategory || 'MAIN COURSE'}</span>
        <h1>{meal.strMeal}</h1>
        <p className="detail-lede">A delicious idea to bring a little more joy to your table. Gather your ingredients and make it your own.</p>
        <div className="detail-facts"><span><Clock3 size={16}/> Cook at your own pace</span><span><MapPin size={16}/> {meal.strArea || 'World kitchen'}</span></div>
        <button className={`button ${saved ? 'button-saved' : 'button-dark'}`} onClick={() => toggleFavorite(meal)}><Heart size={17} fill={saved ? 'currentColor' : 'none'}/>{saved ? 'Saved to favourites' : 'Save to favourites'}</button>
        {meal.strYoutube && <a className="video-link" href={meal.strYoutube} target="_blank" rel="noreferrer"><PlayCircle size={17}/> Watch the recipe <ArrowUpRight size={14}/></a>}
      </div>
    </div>
    <div className="detail-content">
      <aside className="ingredients-panel"><span className="eyebrow">GATHER YOUR GOODNESS</span><h2>The <em>ingredients.</em></h2><p className="ingredient-count">{ingredients.length} ingredients to bring it all together</p>
        <ul className="ingredient-list">{ingredients.map((item, index) => <li key={`${item.ingredient}-${index}`}><span className="ingredient-bullet"/><span>{item.ingredient}</span><span className="ingredient-measure">{item.measure}</span></li>)}</ul>
      </aside>
      <section className="method-panel"><span className="eyebrow">LET'S MAKE SOMETHING LOVELY</span><h2>The <em>method.</em></h2><div className="steps-list">{instructions.map((step, index) => <div className="step-item" key={index}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><p>{step}</p></div>)}</div>
      {meal.strSource && <a className="source-link" href={meal.strSource} target="_blank" rel="noreferrer">Original recipe source <ArrowUpRight size={14}/></a>}
    </section>
    </div>
    <div className="detail-bottom"><span>MADE WITH A LITTLE LOVE</span><span>✳</span><Link to="/recipes">Find another recipe <ArrowUpRight size={15}/></Link></div>
  </div>
}
