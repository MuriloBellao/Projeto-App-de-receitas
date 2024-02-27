import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const allBrn = 'filter-by-all-btn';
const mealBtn = 'filter-by-meal-btn';
const drinkBtn = 'filter-by-drink-btn';
const favoriteBtn = '0-horizontal-favorite-btn';
const sharebtn = '0-horizontal-share-btn';

describe('Componente Favorite Recipes', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: '1',
      type: 'meal',
      nationality: 'Brazilian',
      category: 'Beef',
      alcoholicOrNot: '',
      name: 'Feijoada',
      image: 'feijoada.jpg',
      doneDate: '2022-02-01',
      tags: ['Brazilian', 'Pork', 'Black beans', 'Rice', 'Orange'],
    }]));

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text: any) => {
          return Promise.resolve(text);
        },
      },
      configurable: true,
    });
  });

  afterEach(() => localStorage.clear());

  it('Verifica se os botões de filtro funcionam', async () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );

    const allButton = screen.getByTestId(allBrn);
    const mealButton = screen.getByTestId(mealBtn);
    const drinkButton = screen.getByTestId(drinkBtn);

    await userEvent.click(allButton);
    await userEvent.click(mealButton);
    await userEvent.click(drinkButton);
  });

  it('Verifica se os botões de desfavoritar funcionam', async () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );

    const favoriteButton = screen.getByTestId(favoriteBtn);
    await userEvent.click(favoriteButton);
  });

  it('Verifica se os botões de compartilhar funcionam', async () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );

    const shareButton = screen.getByTestId(sharebtn);
    await userEvent.click(shareButton);
  });
});

it('teste sem dados', async () => {
  render(
    <BrowserRouter>
      <FavoriteRecipes />
    </BrowserRouter>,
  );

  const allButton = screen.getByTestId(allBrn);
  const mealButton = screen.getByTestId(mealBtn);
  const drinkButton = screen.getByTestId(drinkBtn);

  await userEvent.click(allButton);
  await userEvent.click(mealButton);
  await userEvent.click(drinkButton);
});
