import RecipeCard from './RecipeCard'
export default function RecipeGrid({ recipes }) {
  return <div className="recipe-grid">{recipes.map((recipe, index) => <RecipeCard key={recipe.idMeal} recipe={recipe} index={index}/>)}</div>
}
