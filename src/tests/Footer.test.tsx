import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Componente Footer', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
  });
  test('Verifica se o Footer é renderizado sem erros', () => {
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  test('Verifica se o link de Drinks aponta para /drinks', () => {
    const drinksLink = screen.getByTestId('drinks-bottom-btn');
    expect(drinksLink.closest('a')).toHaveAttribute('href', '/drinks');
  });

  test('Verifica se o link de Meals aponta para /meals', () => {
    const mealsLink = screen.getByTestId('meals-bottom-btn');
    expect(mealsLink.closest('a')).toHaveAttribute('href', '/meals');
  });
});
