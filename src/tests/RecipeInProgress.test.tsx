import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeInProgress from '../pages/RecipeInProgress';

describe('Componente RecipeInProgress', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RecipeInProgress />
      </BrowserRouter>,
    );
  });
  it('deve encontrar os elementos na tela e navegar corretamente', () => {
    expect(screen.getByText('Receita em progresso')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();

    const finishBtn = screen.getByTestId('finish-recipe-btn');
    fireEvent.click(finishBtn);
    expect(window.location.pathname).toBe('/done-recipes');

    const favoriteBtn = screen.getByTestId('favorite-btn');
    fireEvent.click(favoriteBtn);
  });
});
