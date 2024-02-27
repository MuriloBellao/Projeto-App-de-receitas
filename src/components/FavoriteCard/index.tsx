import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import useLocalStorage from '../../hooks/useLocalStorage';
import { FavoriteRecipesType } from '../../utils/localStorageTypes';

type FavoriteCardProps = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  index: number;
  updatePage: React.Dispatch<React.SetStateAction<FavoriteRecipesType[]>>;
};

function FavoriteCard({
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
  index,
  updatePage,
}: FavoriteCardProps) {
  const { favoriteRecipes, handleFavoriteRecipes } = useLocalStorage();
  const [share, setShare] = useState('');

  const handleShare = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setShare('Link copied!');
    const url = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(url);
  };

  const handleFavorite = async () => {
    await handleFavoriteRecipes(
      {
        id,
        type,
        nationality,
        category,
        alcoholicOrNot,
        name,
        image,
      },
      'remove',
    );
    updatePage((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <div
      className="d-flex w-90 align-items-center position-relative
      justify-content-between shadow text-decoration-none text-primary
      bg-tertiary rounded overflow-hidden p-2 custom-margin-bottom"
    >
      <Link
        to={ `/${type}s/${id}` }
        className="position-relative w-45 h-100 mr-2"
      >
        <img
          className="w-100 h-100 object-fit-cover"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div
        className="d-flex flex-column justify-content-start
         align-items-start w-50 px-2"
      >
        <Link to={ `/${type}s/${id}` }>
          <p
            className="btn p-0 text-start text-primary fs-4 fw-bold text-truncate m-0"
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </p>
        </Link>
        <p
          className="text-secondary fs-6 fw-medium m-1"
          data-testid={ `${index}-horizontal-top-text` }
        >
          { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot }
        </p>
        <div className="w-100 gap-2 d-flex justify-content-center">
          <button
            className="btn shadow bg-secondary w-50 shadow-sm"
            type="button"
            onClick={ handleShare }
          >
            <img
              className="w-50 p-1"
              src={ shareIcon }
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
            {share}
          </button>
          <button
            className="btn shadow bg-secondary w-50 shadow-sm"
            type="button"
            onClick={ async () => {
              if (favoriteRecipes.length === 1) {
                localStorage.setItem('favoriteRecipes', JSON.stringify([]));
              }
              await handleFavorite();
            } }
          >
            <img
              className="w-50 p-1"
              src={ BlackHeartIcon }
              alt="favorite icon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
