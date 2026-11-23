export function getIngredients(meal) {
  if (!meal) return []
  return Array.from({ length: 20 }, (_, index) => {
    const number = index + 1
    const ingredient = meal[`strIngredient${number}`]?.trim()
    const measure = meal[`strMeasure${number}`]?.trim()
    return ingredient ? { ingredient, measure } : null
  }).filter(Boolean)
}

export function getInstructions(meal) {
  return (meal?.strInstructions || '')
    .split(/\r\n|\n|\r/)
    .map(step => step.trim())
    .filter(Boolean)
}
