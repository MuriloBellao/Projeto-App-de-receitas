import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Recipes from '../components/Recipes';

const mockData = {
  meals: [
    {
      strCategory: 'Beef',
    },
    {
      strCategory: 'Breakfast',
    },
    {
      strCategory: 'Chicken',
    },
    {
      strCategory: 'Dessert',
    },
    {
      strCategory: 'Goat',
    },
    {
      strCategory: 'Lamb',
    },
    {
      strCategory: 'Miscellaneous',
    },
    {
      strCategory: 'Pasta',
    },
    {
      strCategory: 'Pork',
    },
    {
      strCategory: 'Seafood',
    },
    {
      strCategory: 'Side',
    },
    {
      strCategory: 'Starter',
    },
    {
      strCategory: 'Vegan',
    },
    {
      strCategory: 'Vegetarian',
    },
  ],
  drinks: [
    {
      strCategory: 'Ordinary Drink',
    },
    {
      strCategory: 'Cocktail',
    },
    {
      strCategory: 'Shake',
    },
    {
      strCategory: 'Other / Unknown',
    },
    {
      strCategory: 'Cocoa',
    },
  ],
};
describe('Recipes Meals', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    } as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('deve renderizar os cards das receitas corretamente', async () => {
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>,
    );
    await waitFor(() => {
      for (let i = 0; i < 12; i++) {
        expect(screen.getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${i}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${i}-card-name`)).toBeInTheDocument();
      }
    });
  });
  test('deve renderizar checkbox de categoria corretamente Meals', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Recipes />
      </MemoryRouter>,
    );
    await waitFor(() => {
      const categorys = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
      categorys.forEach((category) => {
        const checkbox = screen.getByTestId(`${category}-category-filter`);
        expect(checkbox).toBeInTheDocument();
        fireEvent.click(checkbox);
      });
    });
  });
  it('deve limpar os filtros corretamente', async () => {
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>,
    );
    const clearFiltersButton = screen.getByTestId('All-category-filter');
    fireEvent.click(clearFiltersButton);
    await waitFor(() => {
      for (let i = 0; i < 12; i++) {
        expect(screen.getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
      }
    });
  });
  test('deve renderizar checkbox de categoria corretamente Meals', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Recipes />
      </MemoryRouter>,
    );
    await waitFor(() => {
      const categorys = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
      const checkbox = screen.getByTestId('Beef-category-filter');
      fireEvent.click(checkbox);
      categorys.forEach((category) => {
        const checkboxDrinks = screen.getByTestId(`${category}-category-filter`);
        expect(checkboxDrinks).toBeInTheDocument();
        fireEvent.click(checkboxDrinks);
      });
    });
  });
  it('deve renderizar checkbox de categoria corretamente Drinks', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Recipes />
      </MemoryRouter>,
    );
    await waitFor(() => {
      const categories = mockData.drinks.map((category) => category.strCategory);
      categories.forEach((category) => {
        const checkbox = screen.getByTestId(`${category}-category-filter`);
        expect(checkbox).toBeInTheDocument();
        fireEvent.click(checkbox);
      });
    });
  });
});
