import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const renderSearchBar = (rota = 'Drinks') => {
  render(
    <BrowserRouter>
      <SearchBar rota={ rota } />
    </BrowserRouter>,
  );
};

const getTestElements = () => {
  const searchBarElement = screen.getByTestId('search-input');
  const ingredientRadio = screen.getByTestId('ingredient-search-radio');
  const nameRadio = screen.getByTestId('name-search-radio');
  const letterRadio = screen.getByTestId('first-letter-search-radio');
  const execSearchButton = screen.getByTestId('exec-search-btn');
  return { searchBarElement, ingredientRadio, nameRadio, letterRadio, execSearchButton };
};

describe('Componente SearchBar', () => {
  it('deve renderizar corretamente', () => {
    renderSearchBar();
    const { searchBarElement, ingredientRadio, nameRadio, letterRadio, execSearchButton } = getTestElements();

    expect(searchBarElement).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(execSearchButton).toBeInTheDocument();
  });

  it('deve chamar a função handleLetterClick corretamente', () => {
    renderSearchBar();
    const { letterRadio, searchBarElement, execSearchButton } = getTestElements();

    fireEvent.click(letterRadio);
    fireEvent.change(searchBarElement, { target: { value: 'A' } });
    fireEvent.click(execSearchButton);
  });

  it('deve chamar a função handleNameClick corretamente', async () => {
    renderSearchBar();
    const { nameRadio, searchBarElement, execSearchButton } = getTestElements();

    fireEvent.click(nameRadio);
    fireEvent.change(searchBarElement, { target: { value: 'Pasta' } });
    fireEvent.click(execSearchButton);
  });

  it('deve chamar a função handleIngredientClick corretamente', async () => {
    renderSearchBar();
    const { ingredientRadio, searchBarElement, execSearchButton } = getTestElements();

    fireEvent.click(ingredientRadio);
    fireEvent.change(searchBarElement, { target: { value: 'Chicken' } });
    fireEvent.click(execSearchButton);
  });

  it('deve chamar a função handleClick corretamente', async () => {
    renderSearchBar();
    const { execSearchButton } = getTestElements();

    fireEvent.click(execSearchButton);
  });
});
