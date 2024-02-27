import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchName, fetchIngredient, fetchLetter, searchIngredientDrink,
  searchLetterDrink, searchNameDrink } from '../../utils/FetchApi';

const NoRecipesFoundMessage = "Sorry, we haven't found any recipes for these filters";

function SearchBar({ rota }: any) {
  const [searchInput, setSearchInput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  async function handleLetterClick() {
    try {
      if (searchInput.length !== 1) {
        return window.alert('Your search must have only 1 (one) character');
      }

      let data;

      if (rota === 'Drinks') {
        data = await searchLetterDrink(searchInput);
      } else {
        data = await fetchLetter(searchInput);
      }

      console.log('After API call:', data);

      if (Array.isArray(data) && data.length > 0) {
        console.log('Array Check:', Array.isArray(data));
      } else {
        console.log('No drinks found.');
        alert('Sorry, we don\'t have found any recipes.');
      }
    } catch (error) {
      console.error('An error occurred during letter search:', error);
    }
  }

  async function handleNameClick() {
    try {
      let data;

      if (rota === 'Drinks') {
        data = await searchNameDrink(searchInput);
      } else {
        data = await fetchName(searchInput);
      }

      console.log('Data:', data);

      if (data && data.length > 0) {
        if (data.length === 1) {
          const recipeId = data[0].idDrink || data[0].idMeal;
          const recipeDetailsUrl = rota === 'Drinks' ? `/drinks/${recipeId}`
            : `/meals/${recipeId}`;
          navigate(recipeDetailsUrl);
        }
      } else {
        window.alert(NoRecipesFoundMessage);
      }
    } catch (error) {
      console.error('An error occurred during name search:', error);
      window.alert('An unexpected error occurred. Please try again.');
    }
  }
  async function handleIngredientClick() {
    if (inputValue === 'ingredient') {
      const data = rota === 'Drinks' ? await searchIngredientDrink(searchInput)
        : await fetchIngredient(searchInput);

      console.log('Ingredient Data:', data);

      if (Array.isArray(data) && data.length > 0) {
        console.log('Array Check:', Array.isArray(data));
      } else {
        console.log('No drinks found.');
        alert('Sorry, we don\'t have found any recipes.');
      }
    }
  }

  async function handleClick() {
    try {
      switch (inputValue) {
        case 'letter':
          await handleLetterClick();
          break;
        case 'name':
          await handleNameClick();
          break;
        case 'ingredient':
          await handleIngredientClick();
          break;
        default:
          window.alert("Sorry, something's wrong. Try again!");
      }
    } catch (error) {
      console.error('An error occurred:', error);
      window.alert('An unexpected error occurred. Please try again.');
    }
  }
  return (
    <div>
      <label htmlFor="search">
        pesquisar
        <input
          id="search"
          name="search"
          data-testid="search-input"
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
        />
      </label>
      <label>
        ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="Ingredient"
          checked={ inputValue === 'ingredient' }
          onChange={ () => setInputValue('ingredient') }
        />
      </label>
      <label>
        name
        <input
          data-testid="name-search-radio"
          type="radio"
          value="name"
          checked={ inputValue === 'name' }
          onChange={ () => setInputValue('name') }
        />
      </label>
      <label>
        first letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="letter"
          checked={ inputValue === 'letter' }
          onChange={ () => setInputValue('letter') }
        />
      </label>
      <button data-testid="exec-search-btn" onClick={ handleClick }>
        search
      </button>
    </div>
  );
}

export default SearchBar;
