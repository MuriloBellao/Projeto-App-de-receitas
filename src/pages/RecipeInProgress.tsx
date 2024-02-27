import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import { fetchRecipesDetailsDrinks, fetchRecipesDetailsMeals } from '../utils/FetchApi';
import useLocalStorage from '../hooks/useLocalStorage';

function RecipeInProgress() {
  const locationResult = useLocation();
  const resultSplit = locationResult.pathname.split('/');
  const isDrink = resultSplit[1] === 'drinks';
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    handleDoneRecipes,
    handleInProgressRecipes,
  } = useLocalStorage(); // Using the useLocalStorage hook to manage local state

  const [meal, setMeal] = useState<any>({});
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [copyText, setCopyText] = useState(false);
  const [recipeInformations, setRecipeInformations] = useState<any>({});
  const strIngredient = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20',
  ];
  const [progress, setProgress] = useState<string[]>([]);

  const CallFetchRecipesDetails = async () => {
    const results = isDrink
      ? await fetchRecipesDetailsDrinks(id)
      : await fetchRecipesDetailsMeals(id);
    console.log('results', results);

    setMeal(results[0]);
    console.log(meal);
  };

  useEffect(() => {
    CallFetchRecipesDetails();
    const inProgress: any = localStorage?.getItem('inProgressRecipes');
    setProgress(JSON.parse(inProgress));
  }, []);

  const favoriteFunction = () => {
    const favoriteHeart: any = localStorage.getItem('favoriteRecipes');

    if (favoriteHeart) {
      const resultFavorite = JSON.parse(favoriteHeart);
      setIsFavorite(resultFavorite.some((recipe: any) => recipe?.id === id));
    } else {
      setIsFavorite(false);
    }
  };

  const handleShareClick = () => {
    const link = `${window.location.origin}/${isDrink ? 'drinks' : 'meals'}/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopyText(true);
    }).catch((error) => {
      console.error('Error copying to clipboard:', error);
    });
  };

  const handleClickFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isRecipeFavorited = favorites.some((recipe: any) => recipe.id === id);

    if (isRecipeFavorited) {
      const updatedFavorites = favorites.filter((recipe: any) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      const recipeDetails = {
        id,
        type: isDrink ? 'drink' : 'meal',
        nationality: meal.strArea || '',
        category: isDrink ? meal.strAlcoholic : meal.strCategory,
        alcoholicOrNot: meal.strAlcoholic || '',
        name: isDrink ? meal.strDrink : meal.strMeal,
        image: isDrink ? meal.strDrinkThumb : meal.strMealThumb,
      };

      const updatedFavorites = [...favorites, recipeDetails];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }

    favoriteFunction();
  };

  useEffect(() => {
    if (isDrink) {
      setRecipeInformations({
        drinkOrMeal: 'drink',
        name: meal.strDrink,
        imagem: meal.strDrinkThumb,
      });
    } else {
      setRecipeInformations({
        drinkOrMeal: 'meal',
        name: meal.strMeal,
        imagem: meal.strMealThumb,
      });
    }
  }, [isDrink, meal]);

  const contain = (ingredient: string) => {
    if (progress?.length > 0) {
      return progress?.some((ingred: string) => ingred === ingredient);
    }
  };

  const onProgress = ({ target }: any) => {
    if (progress?.length > 0) {
      const isProgress = progress?.some((ingred: string) => ingred === target.name);

      if (isProgress) {
        setProgress(progress?.filter((ingred: string) => ingred !== target.name));
      } else {
        setProgress([...progress, target.name]);
      }
    } else {
      setProgress([target.name]);
    }
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }, [progress]);

  return (
    <div>
      <h1>Receita em progresso</h1>
      <ul>
        <h2 data-testid="recipe-title">{ meal?.strMeal || meal?.strDrink }</h2>
        <h3 data-testid="recipe-category">
          {
            isDrink ? meal?.strAlcoholic : meal?.strCategory
          }
        </h3>

        <img
          data-testid="recipe-photo"
          src={ meal?.strMealThumb || meal?.strDrinkThumb }
          alt={ `${meal?.idMeal || meal?.idDrink}-imagem` }
        />
        <br />
        {strIngredient.map((ingredient: string, index: any) => (
          meal[`strIngredient${ingredient}`] !== ''
            && meal[`strIngredient${ingredient}`] !== null
            && meal[`strIngredient${ingredient}`] !== undefined) && (
              <li key={ meal.idMeal + ingredient || meal.idDrink }>
                <label
                  style={ { textDecoration: 'line-through solid rgb(0, 0, 0)' } }
                  htmlFor="ingredient-measure"
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    name={ ingredient }
                    type="checkbox"
                    id={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    checked={ contain(ingredient) }
                    onClick={ onProgress }
                  />
                  {meal[`strIngredient${ingredient}`]}
                  {' '}
                  {meal[`strMeasure${index + 1}`]}
                </label>
              </li>
        ))}
      </ul>
      <p data-testid="instructions">
        {meal.strInstructions}
      </p>
      <button
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        Share
      </button>
      {copyText && (
        <div data-testid="share-message">
          Link copied!
        </div>)}

      <button
        id="favorite"
        onClick={ handleClickFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? whiteHeart : blackHeart }
          alt="favorite/unfavorite"
          style={ { width: '16px', height: '16px', marginRight: '5px' } }
        />
        favoritar
      </button>
      <br />
      <button
        data-testid="finish-recipe-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
