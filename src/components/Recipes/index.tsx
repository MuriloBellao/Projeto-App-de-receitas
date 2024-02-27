import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  fetchMeals,
  fetchDrinks,
  fetchListDrinks,
  fetchListMeals,
  fetchFilterDrinks,
  fetchFilterMeals,
} from '../../utils/FetchApi';

function Recipes() {
  const { pathname } = useLocation();
  const isDrink = pathname === '/drinks';
  const [isChecked, setIsChecked] = useState<string>('');
  const [meals, setMeals] = useState<any>([]);
  const [saveMeals, setSaveMeals] = useState<any>([]);
  const [categorys, setCategorys] = useState<any>([]);
  const fetchApi = async () => {
    const results = isDrink ? await fetchDrinks() : await fetchMeals();
    const arrayResults = isDrink
      ? results.drinks.slice(0, 12)
      : results.meals.slice(0, 12);
    setMeals(arrayResults);
    setSaveMeals(arrayResults);
    const resultsCategorys = isDrink
      ? await fetchListDrinks()
      : await fetchListMeals();
    const categories = [...new Set(resultsCategorys
      .map((item: any) => item.strCategory))].slice(0, 5);
    setCategorys(categories);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const handleClickCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setIsChecked(name === isChecked ? '' : name);
  };
  const checkBoxFilters = async () => {
    const results = isDrink
      ? await fetchFilterDrinks(isChecked)
      : await fetchFilterMeals(isChecked);
    setMeals(results.slice(0, 12));
  };
  useEffect(() => {
    if (isChecked) {
      checkBoxFilters();
    } else {
      setMeals(saveMeals);
    }
  }, [isChecked, saveMeals]);
  const handleClearFilterClick = () => {
    setMeals(saveMeals);
    setIsChecked('');
  };
  return (
    <>
      <div>
        {categorys.map((category: any) => (
          <div key={ category }>
            <label htmlFor={ category }>{ category }</label>
            <input
              type="checkbox"
              id={ category }
              name={ category }
              checked={ category === isChecked }
              onChange={ handleClickCategory }
              data-testid={ `${category}-category-filter` }
            />
          </div>
        ))}
      </div>
      <button onClick={ handleClearFilterClick } data-testid="All-category-filter">
        All
      </button>
      <br />
      { meals.map((meal: any, index: number) => (
        <Link
          key={ meal.idMeal || meal.idDrink }
          data-testid={ `${index}-recipe-card` }
          to={ isDrink ? `/drinks/${meal.idDrink}` : `/meals/${meal.idMeal}` }
        >
          <img
            src={ meal.strMealThumb || meal.strDrinkThumb }
            alt={ `${meal.idMeal || meal.idDrink}-imagem` }
            data-testid={ `${index}-card-img` }
            style={ { width: '100px' } }
          />
          <p data-testid={ `${index}-card-name` }>{ meal.strMeal || meal.strDrink }</p>
          <p>{ meal.strCategory }</p>
        </Link>
      ))}
    </>
  );
}
export default Recipes;
