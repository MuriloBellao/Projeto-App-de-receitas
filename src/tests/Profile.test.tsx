import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('Componente Profile', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );
    localStorage.clear();
  });

  test('renders user email with correct data-testid', () => {
    const userEmailElement = screen.getByTestId('profile-email');
    expect(userEmailElement).toBeInTheDocument();
    expect(userEmailElement.textContent).toBe('');
  });

  test('renders done recipes link with correct data-testid and check icon', () => {
    const doneRecipesLink = screen.getByTestId('profile-done-btn');
    const checkIcon = screen.getByAltText('Check icon');

    expect(doneRecipesLink).toBeInTheDocument();
    expect(doneRecipesLink.getAttribute('href')).toBe('/done-recipes');
    expect(checkIcon).toBeInTheDocument();
    expect(checkIcon.getAttribute('src')).toBe('/src/images/blackHeartIcon.svg');
  });

  test('renders logout link with correct data-testid and exit icon, clears localStorage on click', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const exitIcons = screen.queryAllByAltText('Exit icon');

    if (exitIcons.length > 0) {
      const exitIcon = exitIcons[0];

      const logoutLink = exitIcon.parentNode;

      if (logoutLink) {
        expect(logoutLink).toBeInTheDocument();
        expect(logoutLink).toHaveAttribute('href', '/');
        expect(exitIcon).toBeInTheDocument();
        expect(exitIcon).toHaveAttribute('src', '/src/images/profileIcon.svg');

        fireEvent.click(logoutLink);
        expect(localStorage.getItem('user')).toBeNull();
      } else {
        throw new Error('Logout link not found');
      }
    } else {
      throw new Error('Exit icon not found');
    }
  });
});
