import { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = 'https://www.themealdb.com/api/json/v1/1'

/**
 * Fetches recipes matching a search term.
 * Returns { data, loading, error } as required by Assignment 5.
 */
export default function useRecipes(query) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const trimmedQuery = query?.trim()
    if (!trimmedQuery) {
      setData([])
      setError('')
      setLoading(false)
      return
    }

    const controller = new AbortController()
    async function fetchRecipes() {
      setLoading(true)
      setError('')
      try {
        const response = await axios.get(`${API_BASE}/search.php`, {
          params: { s: trimmedQuery },
          signal: controller.signal
        })
        setData(response.data.meals || [])
      } catch (err) {
        if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
          setError('We could not reach the recipe kitchen. Please try again.')
          setData([])
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    fetchRecipes()
    return () => controller.abort()
  }, [query])

  return { data, loading, error }
}
