import { Link } from 'react-router-dom'
import { ArrowRight, Search, Sparkles, Leaf, Clock3 } from 'lucide-react'
import { useState } from 'react'
import useRecipes from '../hooks/useRecipes'
import RecipeGrid from '../components/RecipeGrid'
import Loading from '../components/Loading'

const picks = [
  { name: 'Quick & easy', term: 'pasta', note: 'Good food, no fuss', icon: '✳' },
  { name: 'Comfort food', term: 'chicken', note: 'A hug on a plate', icon: '♡' },
  { name: 'Fresh & bright', term: 'salad', note: 'A little green goodness', icon: '✿' }
]

export default function Home() {
  const [term, setTerm] = useState('')
  const { data, loading, error } = useRecipes('pasta')
  const submit = e => { e.preventDefault(); if (term.trim()) window.location.href = `/recipes?search=${encodeURIComponent(term.trim())}` }
  return <div className="home-page">
    <section className="hero wrap">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-line"/> THE ART OF EVERYDAY COOKING</span>
        <h1>Find your next<br/><em>favourite</em> flavour.</h1>
        <p className="hero-description">A little inspiration for whatever is in your fridge, on your mind, or around your table.</p>
        <form className="hero-search" onSubmit={submit}>
          <Search size={19}/>
          <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Try “creamy pasta” or “chicken”…" aria-label="Search recipes"/>
          <button type="submit" aria-label="Search"><ArrowRight size={19}/></button>
        </form>
        <div className="hero-footnote"><Sparkles size={14}/> Your next delicious idea is just a search away.</div>
      </div>
      <div className="hero-art">
        <div className="hero-photo-frame"><img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1100&q=85" alt="Beautifully arranged fresh meal"/></div>
        <div className="hero-stamp"><span>GOOD FOOD</span><strong>GOOD<br/>MOOD</strong><span>ALWAYS ✳</span></div>
        <div className="hero-caption"><span className="caption-rule"/> SIMPLE INGREDIENTS. LOVELY MOMENTS.</div>
      </div>
      <div className="hero-side-note">EST. FOR THE LOVE OF FOOD · VOL. 01</div>
    </section>

    <section className="quick-picks section-pad">
      <div className="wrap">
        <div className="section-heading">
          <div><span className="eyebrow">A GOOD PLACE TO START</span><h2>What are you <em>craving?</em></h2></div>
          <Link to="/recipes" className="text-link">Explore all recipes <ArrowRight size={16}/></Link>
        </div>
        <div className="pick-grid">{picks.map((pick, i) => <Link to={`/recipes?search=${pick.term}`} className={`pick-card pick-${i}`} key={pick.name}>
          <span className="pick-icon">{pick.icon}</span><span className="pick-name">{pick.name}</span><span className="pick-note">{pick.note}</span><ArrowRight className="pick-arrow" size={18}/>
        </Link>)}</div>
      </div>
    </section>

    <section className="featured-section section-pad wrap">
      <div className="section-heading">
        <div><span className="eyebrow">A LITTLE INSPIRATION</span><h2>Today’s <em>table.</em></h2><p className="section-subtitle">A few lovely ideas to get you started.</p></div>
        <Link to="/recipes" className="text-link">See the recipe collection <ArrowRight size={16}/></Link>
      </div>
      {loading ? <Loading label="Setting the table"/> : error ? <p className="inline-error">{error}</p> : <RecipeGrid recipes={data.slice(0, 4)}/>}
      {!loading && !error && data.length === 0 && <p className="empty-inline">Our kitchen is taking a little break. Explore recipes to search again.</p>}
    </section>
    <section className="manifesto">
      <div className="wrap manifesto-inner"><span className="manifesto-symbol">✳</span><p>Cooking isn’t about perfection.<br/><em>It’s about making something with love.</em></p><span className="manifesto-small">SAVE WHAT YOU LOVE · COOK WHAT YOU CRAVE</span></div>
    </section>
  </div>
}
