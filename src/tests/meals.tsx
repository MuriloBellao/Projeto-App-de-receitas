// import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
// import { vi } from 'vitest';
// import { BrowserRouter, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { renderWithRouterAndRedux } from './renderWith';
// import App from '../App';
// import { mockMeals, mockMealsCategories } from './mocks/mockMeals'; // Import the missing mockMealsCategories variable

// // teste

// afterEach(() => {
//   vi.clearAllMocks();
// });

// describe('Testes Meals', () => {
//   it('Renderiza page Meals', async () => {
//     global.fetch = vi.fn().mockResolvedValue({
//       json: () => mockMeals,
//     });
//     const route = '/meals';
//     const { user } = renderWithRouterAndRedux(<App />, {
//       initialEntries: [route], initialState: { state } });

//     await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

//     const promises = mockMeals.meals.map(async (meal, index) => {
//       const element = await screen.findByTestId(`${index}-recipe-card`);
//       expect(element).toBeInTheDocument();
//     });

//     await Promise.all(promises);

//     const recipeCards = await screen.findAllByTestId(/recipe-card/i);
//     expect(recipeCards.length).toBe(12);
//   });

//   it('Testa se renderiza 5 botões com as 5 primeiras categorias', async () => {
//     global.fetch = vi.fn().mockResolvedValue({
//       json: () => mockMealsCategories,
//     });
//     const route = '/meals';
//     const { user } = renderWithRouterAndRedux(<App />, {
//       initialEntries: [route], initialState: { state } });

//     const categoryButtons = await screen.findAllByTestId(/category-filter/i);
//     expect(categoryButtons.length).toBe(5);
//   });
// });
