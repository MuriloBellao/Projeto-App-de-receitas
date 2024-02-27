import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from './Header';

type RecipeDetailsType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[]
};

function FavoriteRecipes() {
  const [recipesDone, setRecipesDone] = useState<RecipeDetailsType[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [shareMessage, setShareMessage] = useState<boolean>(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  const [recipeFilter, setRecipeFilter] = useState<string>('all');

  useEffect(() => {
    const storedFavoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes') ?? '[]');
    setRecipesDone(storedFavoriteRecipes);
    const favoritesArray = storedFavoriteRecipes
      .map((recipe: RecipeDetailsType) => recipe.id);
    setFavoriteRecipes(favoritesArray);
  }, []);

  const copyText = async (recipe: RecipeDetailsType) => {
    const url = `${window.location.origin}/${recipe.type}s/${recipe.id}`;
    await navigator.clipboard.writeText(url);
    setShareMessage(true);
  };

  const toggleFavorite = (recipe: RecipeDetailsType) => {
    const recipeId = recipe.id;
    const isFavorite = favoriteRecipes.includes(recipeId);
    if (isFavorite) {
      const updatedFavorites = favoriteRecipes.filter((favRec) => favRec !== recipeId);
      setFavoriteRecipes(updatedFavorites);
      const updatedRecipes = recipesDone.filter((recipes) => recipes.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
      setRecipesDone(updatedRecipes);
    }
  };

  const handleFilterChange = (newFilter: string, newRecipeFilter: string) => {
    setFilter(newFilter);
    setRecipeFilter(newRecipeFilter);
  };

  const filteredRecipesByFilter = filter === 'all'
    ? recipesDone
    : recipesDone.filter((recipe) => recipe.type === filter);

  const filteredRecipesByType = recipeFilter === 'all'
    ? filteredRecipesByFilter
    : filteredRecipesByFilter.filter((recipe) => (
      (recipeFilter === 'meals' && !recipe.alcoholicOrNot)
      || (recipeFilter === 'drinks' && recipe.alcoholicOrNot)
    ));

  return (
    <div>
      <Header route="Favorite Recipes" />
      <button
        onClick={ () => handleFilterChange('all', 'all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        className="d-flex flex-column justify-content-center"
        onClick={ () => handleFilterChange('meal', 'meals') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        className="d-flex flex-column justify-content-center
          align-items-center btn p-2 text-primary fw-medium w-25 overflow-hidden"
        onClick={ () => handleFilterChange('drink', 'drinks') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div className="recipe-cards">
        {filteredRecipesByType.map((recipe, index) => (
          <div key={ index } className="recipe-card">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                width="200px"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            </Link>
            {recipe.type === 'meal' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
            )}
            {recipe.type === 'drink' && (
              <>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.alcoholicOrNot ? 'Alcoholic' : 'Non-Alcoholic' }
                </p>
                {shareMessage && <h2>Link copied!</h2>}
              </>
            )}
            <button onClick={ () => copyText(recipe) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt=""
              />
            </button>
            <button onClick={ () => toggleFavorite(recipe) }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="ícone do botão favoritar"
              />
            </button>
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            <div>
              {recipe.tags
              && recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
