import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../pages/Header';

describe('Componente header', () => {
  test('Verifica se renderiza o título com base na prop "route"', () => {
    render(
      <BrowserRouter>
        <Header route="Meals" favorite="Favorite Recipes" />
      </BrowserRouter>,
    );

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle.textContent).toBe('Meals');
  });

  test('Verifica se renderiza o título com base na prop "favorite', () => {
    render(
      <BrowserRouter>
        <Header route="" favorite="Favorite Recipes" />
      </BrowserRouter>,
    );

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle.textContent).toBe('Favorite Recipes');
  });

  test('Verifica o alterna a entrada de pesquisa quando o botão de pesquisa é clicado', () => {
    render(
      <BrowserRouter>
        <Header route="Meals" favorite="Favorite Recipes" />
      </BrowserRouter>,
    );

    const searchButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchBar = screen.queryByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
  });

  test('navega para a página de perfil quando o botão de perfil é clicado', () => {
    render(
      <BrowserRouter>
        <Header route="Meals" favorite="Favorite Recipes" />
      </BrowserRouter>,
    );

    const profileButton = screen.getByTestId('profile-top-btn');
    fireEvent.click(profileButton);

    expect(window.location.pathname).toBe('/profile');
  });
});
