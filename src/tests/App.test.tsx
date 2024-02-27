import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders Login component for the "/" route', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(window.location.pathname).toBe('/');
});

test('renders Profile component for the "/profile" route', () => {
  render(
    <MemoryRouter initialEntries={ ['/profile'] }>
      <App />
    </MemoryRouter>,
  );

  expect(window.location.pathname).toBe('/');
});

test('renders DoneRecipes component for the "/Done-Recipes" route', () => {
  render(
    <MemoryRouter initialEntries={ ['/Done-Recipes'] }>
      <App />
    </MemoryRouter>,
  );

  expect(window.location.pathname).toBe('/');
});

test('renders FavoriteRecipes component for the "/favorite-recipes" route', () => {
  render(
    <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
      <App />
    </MemoryRouter>,
  );

  expect(window.location.pathname).toBe('/');
});

test('renders RecipeDetails component for the "/meals/:id" route', () => {
  render(
    <MemoryRouter initialEntries={ ['/meals/123'] }>
      <App />
    </MemoryRouter>,
  );

  expect(window.location.pathname).toBe('/');
});

test('renders RecipeDetails component for the "/drinks/:id" route', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(window.location.pathname).toBe('/');
});

test('renders RecipeInProgress component for the "/meals/:id/in-progress" route', () => {
  render(
    <MemoryRouter initialEntries={ ['/meals/123/in-progress'] }>
      <App />
    </MemoryRouter>,
  );

  expect(window.location.pathname).toBe('/');
});
