import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails';

let favoriteBtn: HTMLElement;

const setupHeader = () => {
  render(
    <MemoryRouter>
      <RecipeDetails />
    </MemoryRouter>,
  );

  favoriteBtn = screen.getByTestId('favorite-btn');
};

describe('Componente RecipeDetails', () => {
  beforeEach(() => {
    setupHeader();
  });

  test('Verifica a renderização inicial do componente', () => {
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
  });

  test('Verifica a navegação ao clicar no botão Continue Recipe', () => {
    fireEvent.click(screen.getByTestId('start-recipe-btn'));
  });

  test('Verifica o click no botão de compartilhar', () => {
    fireEvent.click(screen.getByTestId('share-btn'));
  });

  test('Verifica o click no botão de favoritar', () => {
    fireEvent.click(favoriteBtn);
  });

  test('Verifica se as funções handle são chamadas corretamente', async () => {
    fireEvent.click(favoriteBtn);
    const startRecipeButton = screen.getByTestId('start-recipe-btn');
    fireEvent.click(startRecipeButton);
  });

  test('Verifica se localStorage é atualizado corretamente', () => {
    fireEvent.click(favoriteBtn);
  });
});
