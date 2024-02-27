import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

const testEmail = 'test@test.com';
const testValidPassword = 'senhavalida';
const invalidPassword = '12345';

const setupLogin = () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  return { emailInput, passwordInput, submitButton };
};

describe('Testes login', () => {
  test('Verifica se ao colocar uma senha com 6 caracteres ou menos desabilita o botão de Enter', () => {
    const { emailInput, passwordInput, submitButton } = setupLogin();

    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.change(passwordInput, { target: { value: invalidPassword } });

    expect(submitButton).toHaveAttribute('disabled');
  });

  test('Verifica se o botão está ativado se o e-mail e a senha forem válidos', () => {
    const { emailInput, passwordInput, submitButton } = setupLogin();

    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.change(passwordInput, { target: { value: testValidPassword } });

    expect(submitButton).not.toHaveAttribute('disabled');
  });

  test('Verifica se, após a submissão, a chave user está salva em localStorage', () => {
    const { emailInput, passwordInput, submitButton } = setupLogin();

    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.change(passwordInput, { target: { value: testValidPassword } });

    fireEvent.click(submitButton);

    const storedUser = localStorage.getItem('user') as string | null;
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser) as { email: string };
      console.log(parsedUser.email);
      expect(parsedUser.email).toBe('test@test.com');
    }
  });
});
