# Savorly — Recipe Discovery App

A polished, responsive multi-page React recipe discovery app built for **Phase 3 · Assignment No. 5**.

## Features
- React Router DOM routes: Home, Recipes, Recipe Detail (`/recipes/:id`), and Favourites
- Link-based navigation with active link highlighting
- Custom `useRecipes(query)` hook using Axios and TheMealDB public API
- Controlled search form with `useState`
- Loading, error, and empty-result states
- Recipe detail fetched by ID with `useParams`
- Add/remove favourites shared through React Context
- Favourites persisted in `localStorage` across navigation and refresh
- Responsive editorial design with mobile layout

## Tech stack
React 18 · Vite · React Router DOM · Axios · Lucide React · TheMealDB API

## Run locally
1. Install Node.js (18+ recommended).
2. Open this project folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Production build
Run `npm run build`. The production-ready files are generated in `dist/`.

## API
- Search: `https://www.themealdb.com/api/json/v1/1/search.php?s={query}`
- Details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}`

TheMealDB is a public API. An internet connection is required for recipe search and details.

## Assignment checklist
- [x] Home, Recipes, Recipe Detail, Favourites pages
- [x] Navbar with Link navigation and active highlighting
- [x] `useRecipes(query)` custom hook
- [x] Axios API requests
- [x] Controlled search form
- [x] Loading and error handling
- [x] `useParams` recipe detail
- [x] Save/remove favourites
- [x] Shared favourites state persists across routes and refreshes

## Submission details
- Learner: Devadharshini V
- Batch: Agentic FSD-ANB49
- Assignment: Phase 3 — Assignment No. 5, Recipe Search App
