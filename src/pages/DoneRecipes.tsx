import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import shareImg from '../images/shareIcon.svg';
import All from '../images/rockGlass.svg';
import AllMeals from '../images/mealIcon.svg';
import AllDrinks from '../images/drinkIcon.svg';
import Perfil from '../images/profileIcon.svg';
import Header from './Header';

function DoneRecipes() {
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [linkHasBeenCopied, setLinkHasBeenCopied] = useState(false);
  const { doneRecipes } = useLocalStorage();
  const navigate = useNavigate();
  let filteredRecipes = doneRecipes;

  const handleSelectedFilter = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const handleRedirect = (recipeType: string, recipeId: string) => {
    navigate(`/${recipeType}s/${recipeId}`);
  };

  if (selectedFilter === 'meals') {
    filteredRecipes = doneRecipes.filter((recipe:
    { type: string; }) => recipe.type === 'meal');
  } else if (selectedFilter === 'drinks') {
    filteredRecipes = doneRecipes.filter((recipe:
    { type: string; }) => recipe.type === 'drink');
  }

  return (
    <>
      <Header route="Done Recipes" />
      <nav
        className="d-flex flex-wrap justify-content-center
       align-items-start my-2 w-100"
      >
        <button
          className="d-flex flex-column justify-content-center
           align-items-center btn p-2 text-primary fw-medium w-25 overflow-hidden"
          data-testid="filter-by-all-btn"
          onClick={ () => handleSelectedFilter('none') }
        >
          <img src={ All } alt="All Icon" className="w-100" />
          All
        </button>

        <button
          className="d-flex flex-column justify-content-center
           align-items-center btn p-2 text-primary fw-medium w-25 overflow-hidden"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleSelectedFilter('meals') }
        >
          <img src={ AllMeals } alt="All Icon" className="w-100" />
          Meals
        </button>

        <button
          className="d-flex flex-column justify-content-center
          align-items-center btn p-2 text-primary fw-medium w-25 overflow-hidden"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleSelectedFilter('drinks') }
        >
          <img src={ AllDrinks } alt="All Icon" className="w-100" />
          Drinks
        </button>
      </nav>

      <article
        className="d-flex w-100 flex-wrap
      justify-content-start align-items-start
      gap-2 ms-4 position-relative"
      >
        {(filteredRecipes ?? []).map((recipe, index) => (
          <div
            className="d-flex w-90 align-items-center position-relative
            justify-content-between shadow text-decoration-none text-primary
            bg-tertiary rounded overflow-hidden p-2 custom-margin-bottom"
            key={ recipe.id }
          >
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              className="position-relative w-45 h-100 mr-2"
            >
              <img
                className="w-100 h-100 object-fit-cover"
                src={ recipe.image }
                alt="Imagem do Card"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div
              className="d-flex flex-column justify-content-start
             align-items-start w-50 px-2"
            >
              <button
                className="btn p-0 text-start text-primary fs-4 fw-bold text-truncate m-0"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => handleRedirect(recipe.type, recipe.id) }
              >
                {recipe.name}
              </button>
              {recipe.type === 'meal' ? (
                <>
                  <p
                    className="text-secondary fs-6 fw-medium m-1"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                  <p
                    className="fs-6 text-truncate w-100"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipe.doneDate}
                  </p>
                  <ul className="p-0 m-0 d-flex flex-wrap w-100 fs-6 gap-2">
                    {Array.isArray(recipe.tags) && recipe.tags.length
                     > 0 && recipe.tags.map((tagName: string, tagIndex: number) => (
                       <li
                         className="bg-primary bg-opacity-50 text-tertiary
                        px-3 py-1 rounded text-center text-uppercase fw-medium
                        list-group-item"
                         key={ tagIndex }
                         data-testid={ `${index}-${tagName}-horizontal-tag` }
                       >
                         {tagName}
                       </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <p
                    className="text-secondary fs-6 fw-medium m-1"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </p>
                  <p
                    className="fs-6 text-truncate w-100"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipe.doneDate}
                  </p>
                </>
              )}
              {linkHasBeenCopied && (
                <span
                  className="position-absolute text-tertiary bg-primary
                   rounded z-2 shadow-sm px-2 py-1 fw-medium top-30 bg-opacity-50 w-40"
                >
                  Link copied!
                </span>
              )}
              <button
                className="btn shadow bg-secondary w-50 shadow-sm"
                onClick={ async (e) => {
                  e.preventDefault();
                  window.navigator.clipboard.writeText(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                  setLinkHasBeenCopied(true);
                } }
              >
                <img
                  className="w-50 p-1"
                  src={ shareImg }
                  alt="Compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                className="btn shadow bg-secondary w-50 shadow-sm"
                data-testid="profile-top-btn"
                onClick={ () => handleSelectedFilter('profile') }
              >
                <img
                  src={ Perfil }
                  alt="Perfil Icon"
                  className="w-50 p-1"
                  data-testid="profile-top-btn"
                />
                Profile
              </button>
            </div>
          </div>
        ))}
      </article>
    </>
  );
}

export default DoneRecipes;
