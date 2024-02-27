import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CoracaoVazio from '../images/whiteHeartIcon.svg';
import CoracaoCheio from '../images/blackHeartIcon.svg';
import { fetchRecipesDetailsDrinks, fetchRecipesDetailsMeals } from '../utils/FetchApi';
import Recommendation from '../Recommendations';

function RecipeDetails() {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [recipeInformations, setRecipeInformations] = useState<any>({});
  const [urlCopyState, setUrlCopyState] = useState<string>('');
  const navigate = useNavigate();
  const [nameOfButton, setNameOfButton] = useState<any>('Start Recipe');
  const [urlState, setUrlState] = useState<string>('');
  const [meal, setMeal] = useState<any>([]);
  const locationResult = useLocation();
  const resultSplit = locationResult.pathname.split('/');
  const idRecipe = resultSplit[2];
  const isDrink = resultSplit[1] === 'drinks';
  const strIngredient = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20',
  ];

  const CallFechRecipesDetais = async () => {
    const results = isDrink
      ? await fetchRecipesDetailsDrinks(idRecipe)
      : await fetchRecipesDetailsMeals(idRecipe);
    setMeal(results[0]);
  };

  useEffect(() => {
    CallFechRecipesDetais();
    if (isDrink) {
      const inProgressRecipesString = localStorage.getItem('inProgressRecipes');
      const inProgressRecipes = inProgressRecipesString
        ? JSON.parse(inProgressRecipesString) : null;
      if (inProgressRecipes?.drinks[idRecipe]) {
        setNameOfButton('Continue Recipe');
      }
    } else {
      const inProgressRecipesString = localStorage.getItem('inProgressRecipes');
      const inProgressRecipes = inProgressRecipesString
        ? JSON.parse(inProgressRecipesString) : null;
      if (inProgressRecipes?.meals[idRecipe]) {
        setNameOfButton('Continue Recipe');
      }
    }
  }, []);

  const favoriteFuction = () => {
    const favoriteHeart: any = localStorage.getItem('favoriteRecipes');
    if (favoriteHeart) {
      const resultfavorite = JSON.parse(favoriteHeart);
      if (resultfavorite.length > 0) {
        resultfavorite?.forEach((receita: any) => {
          setIsFavorite(receita?.id === idRecipe);
        });
      } else {
        setIsFavorite(false);
      }
    }
  };

  useEffect(() => {
    favoriteFuction();
  }, []);
  useEffect(() => {
    if (meal?.strYoutube) {
      const urlYoutube = meal.strYoutube.split('/')[3].split('=')[1];
      setUrlState(urlYoutube);
    }
  }, [meal]);

  const handleClickStartRecipe = (event: any) => {
    event?.preventDefault();
    const inProgressRecipe = {
      drinks: {
        [meal.idDrink]: [],
      },
      meals: {
        [meal.idMeal]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
    if (isDrink) {
      navigate(`/drinks/${idRecipe}/in-progress`);
    } else {
      navigate(`/meals/${idRecipe}/in-progress`);
    }
  };
  const handleClickToShare = async (event: any) => {
    event?.preventDefault();
    if (navigator.clipboard) {
      const urlToCopy = window.location.href;
      try {
        await navigator.clipboard.writeText(urlToCopy);
        console.log('URL copiada para a área de transferência:', urlToCopy);
        setUrlCopyState('Link copied!');
      } catch (err) {
        console.error('Erro ao copiar URL para a área de transferência', err);
      }
    } else {
      console.error('A API da área de transferência não é suportada neste navegador');
    }
  };
  const handleClickFavorite = (event: any) => {
    event?.preventDefault();
    const recuperaFavorites: any = localStorage.getItem('favoriteRecipes');
    if (recuperaFavorites) {
      const currentFavorites = JSON.parse(recuperaFavorites);
      const isRecipeFavorited = currentFavorites
        .some((receita: any) => receita.id === idRecipe);
      if (isRecipeFavorited) {
        const updatedFavorites = currentFavorites
          .filter((receita: any) => receita.id !== idRecipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      } else {
        currentFavorites.push({
          id: idRecipe,
          type: recipeInformations.drinkOrMeal,
          nationality: meal.strArea || '',
          category: meal.strCategory || '',
          alcoholicOrNot: meal.strAlcoholic || '',
          name: recipeInformations.name,
          image: recipeInformations.imagem,
        });
        localStorage.setItem('favoriteRecipes', JSON.stringify(currentFavorites));
      }
    } else {
      const firstFavorite = [{
        id: idRecipe,
        type: recipeInformations.drinkOrMeal,
        nationality: meal.strArea || '',
        category: meal.strCategory || '',
        alcoholicOrNot: meal.strAlcoholic || '',
        name: recipeInformations.name,
        image: recipeInformations.imagem,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(firstFavorite));
    }
    favoriteFuction();
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
  }, [meal]);

  return (
    <div>
      <ul>
        <h1 data-testid="recipe-title">{ meal?.strMeal || meal?.strDrink }</h1>
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
        {strIngredient.map((ingredient: string, index: any) => (
          <div key={ meal.idMeal + ingredient || meal.idDrink }>
            {(meal[`strIngredient${ingredient}`] !== ''
              && meal[`strIngredient${ingredient}`] !== null
              && meal[`strIngredient${ingredient}`] !== undefined) && (
                <li data-testid={ `${index}-ingredient-name-and-measure` }>
                  {meal[`strIngredient${ingredient}`]}
                  {meal[`strMeasure${index + 1}`]}
                </li>
            )}
          </div>
        ))}
      </ul>
      <p data-testid="instructions">
        {meal.strInstructions}
      </p>
      <h2>Recipe Details</h2>
      {urlState !== '' && (<iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${urlState}` }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;
        gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />)}
      <button
        className="startRecipe"
        onClick={ handleClickStartRecipe }
        data-testid="start-recipe-btn"
      >
        {nameOfButton}
      </button>
      <br />
      <button onClick={ handleClickToShare } data-testid="share-btn">compartilhar</button>
      <p>{urlCopyState !== '' && urlCopyState}</p>

      <button
        id="favorite"
        onClick={ handleClickFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? CoracaoCheio : CoracaoVazio }
          alt="Coração"
          style={ { width: '16px', height: '16px', marginRight: '5px' } }
        />
        favoritar
      </button>
      <br />
      <br />
      <Recommendation isDrink={ isDrink } />
    </div>
  );
}

export default RecipeDetails;
