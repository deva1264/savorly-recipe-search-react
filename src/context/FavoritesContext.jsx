import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'savorly-favourites-v1'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = id => favorites.some(recipe => recipe.idMeal === id)
  const toggleFavorite = recipe => setFavorites(current =>
    current.some(item => item.idMeal === recipe.idMeal)
      ? current.filter(item => item.idMeal !== recipe.idMeal)
      : [...current, recipe]
  )

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite }), [favorites])
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider')
  return context
}
