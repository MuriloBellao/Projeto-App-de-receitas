const urls = {
  '/meals.all': 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  '/drinks.all': 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
};
export async function fetchAllRecipes(pathname: '/meals' | '/drinks') {
  const response = await fetch(urls[`${pathname}.all`]);
  const data = await response.json();
  const { meals, drinks } = data;
  if (meals) return meals;
  return drinks;
}
