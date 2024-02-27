import { useEffect, useState } from 'react';
import { fetchDrinks, fetchMeals } from '../utils/FetchApi';

function Recommendation({ isDrink }: any) {
  const [carrosselIndex, setCarrosselIndex] = useState(0);
  const [recommendations, setRecommendations] = useState<any>();

  const fetchRecommendations = async () => {
    const results = isDrink ? await fetchMeals() : await fetchDrinks();
    console.log(results);
    const arrayResults = isDrink
      ? results.meals.slice(0, 6) : results.drinks.slice(0, 6);
    console.log('recomendations', arrayResults);
    setRecommendations(arrayResults);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleClickNext = () => {
    setCarrosselIndex((prevIndex) => (prevIndex + 1) % (recommendations.length));
  };

  const handleClickPrev = () => {
    setCarrosselIndex((prevIndex) => (prevIndex - 1 + recommendations.length)
    % (recommendations.length));
  };

  return (
    <div>
      <h2>Recomendações</h2>
      <div
        style={ { display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '20px' } }
      >
        <button onClick={ handleClickPrev }>Anterior</button>
        <button onClick={ handleClickNext }>Próxima</button>
      </div>
      <div>
        <div
          style={ { display: 'flex',
            width: '100px' } }
        >
          {recommendations && recommendations.map((receita: any, index: any) => (
            <div
              className={
                (index >= carrosselIndex && index < carrosselIndex + 2)
                  ? ''
                  : 'hide'
              }
              data-testid={ `${index}-recommendation-card` }
              key={ receita.idMeal + index || receita.idDrink + receita }
            >
              <h3 data-testid={ `${index}-recommendation-title` }>
                {receita.strDrink || receita.strMeal}
              </h3>
              <img
                src={ receita?.strMealThumb || receita?.strDrinkThumb }
                alt={ `${receita?.idMeal || receita?.idDrink}-imagem` }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
