import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';

const ALL_BTN_TEST_ID = 'filter-by-all-btn';
const MEALS_BTN_TEST_ID = 'filter-by-meal-btn';
const DRINKS_BTN_TEST_ID = 'filter-by-drink-btn';
const ACTIVE_CLASS = 'active';

describe('Componente Done Recipes Meals', () => {
  test('Verifica se os botões renderizam corretamente', async () => {
    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );

    const allBtn = screen.getByTestId(ALL_BTN_TEST_ID);
    const mealsBtn = screen.getByTestId(MEALS_BTN_TEST_ID);
    const drinksBtn = screen.getByTestId(DRINKS_BTN_TEST_ID);
    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    await userEvent.click(allBtn);
    await userEvent.click(mealsBtn);
    await userEvent.click(drinksBtn);
  });

  test('Verifica se filtra receitas quando os botões de filtro são clicados', async () => {
    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );

    const mealsBtn = screen.getByTestId(MEALS_BTN_TEST_ID);
    const drinksBtn = screen.getByTestId(DRINKS_BTN_TEST_ID);
    await userEvent.click(mealsBtn);
    expect(screen.getByText('Meals')).toBeInTheDocument();
    await userEvent.click(drinksBtn);
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });

  test('Verifica se handleSelectedFilter atualiza o filtro selecionado', async () => {
    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );
    const allBtn = screen.getByTestId(ALL_BTN_TEST_ID);
    const mealsBtn = screen.getByTestId(MEALS_BTN_TEST_ID);
    const drinksBtn = screen.getByTestId(DRINKS_BTN_TEST_ID);
    await userEvent.click(mealsBtn);
    expect(allBtn).not.toHaveClass(ACTIVE_CLASS);
    expect(drinksBtn).not.toHaveClass(ACTIVE_CLASS);
    await userEvent.click(drinksBtn);
    expect(allBtn).not.toHaveClass(ACTIVE_CLASS);
    expect(mealsBtn).not.toHaveClass(ACTIVE_CLASS);
  });
});
