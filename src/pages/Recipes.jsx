import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import useRecipes from '../hooks/useRecipes'
import RecipeGrid from '../components/RecipeGrid'
import Loading from '../components/Loading'

const suggestions = ['chicken', 'pasta', 'beef', 'vegetarian', 'seafood']

export default function Recipes() {
  const [params, setParams] = useSearchParams()
  const [input, setInput] = useState(params.get('search') || '')
  const [query, setQuery] = useState(params.get('search') || 'chicken')
  const { data, loading, error } = useRecipes(query)

  useEffect(() => {
    const fromUrl = params.get('search')
    if (fromUrl) { setInput(fromUrl); setQuery(fromUrl) }
  }, [params])

  const handleSubmit = e => {
    e.preventDefault()
    const next = input.trim()
    if (!next) return
    setQuery(next)
    setParams({ search: next })
  }
  const chooseSuggestion = value => { setInput(value); setQuery(value); setParams({ search: value }) }

  return <div className="inner-page wrap">
    <div className="page-intro">
      <span className="eyebrow"><span className="eyebrow-line"/> THE RECIPE COLLECTION</span>
      <h1>Something good<br/>is <em>cooking.</em></h1>
      <p>Search by ingredient or dish. Your next kitchen favourite is waiting.</p>
    </div>
    <form className="recipe-search" onSubmit={handleSubmit}>
      <Search size={20}/><input value={input} onChange={e => setInput(e.target.value)} placeholder="What would you love to cook?" aria-label="Search recipes"/>
      {input && <button className="clear-search" type="button" onClick={() => setInput('')} aria-label="Clear search"><X size={17}/></button>}
      <button className="button button-dark search-submit" type="submit">Find recipes <Search size={16}/></button>
    </form>
    <div className="suggestion-row"><span>POPULAR:</span>{suggestions.map(item => <button key={item} className={`suggestion-chip${query === item ? ' selected' : ''}`} onClick={() => chooseSuggestion(item)}>{item}</button>)}</div>
    <div className="results-heading"><div><span className="eyebrow">FRESH FROM THE KITCHEN</span><h2>{query ? <>Results for <em>“{query}”</em></> : 'Explore recipes'}</h2></div><span className="results-count">{loading ? 'Searching…' : `${data.length} ${data.length === 1 ? 'recipe' : 'recipes'} found`}</span></div>
    {loading ? <Loading/> : error ? <div className="state-panel error-panel"><span>!</span><h3>We hit a little kitchen hiccup.</h3><p>{error}</p><button className="button button-outline" onClick={() => setQuery(query)}>Try again</button></div> : data.length ? <RecipeGrid recipes={data}/> : <div className="state-panel"><span className="state-emoji">⌕</span><h3>No recipes found just yet.</h3><p>Try another ingredient or dish name. A small change can lead to a delicious discovery.</p><button className="button button-outline" onClick={() => chooseSuggestion('chicken')}>Try a popular search</button></div>}
  </div>
}
