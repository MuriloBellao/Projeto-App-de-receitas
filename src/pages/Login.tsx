import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type InputsTypes = {
  email: string,
  password: string,
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const inputHaveFormatValid = (input: string) => input !== '';
const inputHaveEmailFormatValid = (input: string) => emailRegex.test(input);

const passHaveMinLength = (pass: string) => pass.length >= 7;

const validatePasswordAndEmail = (types: InputsTypes) => {
  const inputFormatValid = inputHaveFormatValid(types.email)
  && inputHaveEmailFormatValid(types.email);

  const passFormatValid = passHaveMinLength(types.password);

  return passFormatValid && inputFormatValid;
};
const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
  },
};

export default function Login() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setUserLogin((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    const updatedInputs = { ...userLogin.user, [name]: value };
    const isValid = validatePasswordAndEmail(updatedInputs);
    setDisabled(!isValid);
  };

  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          value={ userLogin.user.email }
          onChange={ (event) => handleSubmit(event) }
          data-testid="email-input"
          placeholder="Digite seu Email"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ userLogin.user.password }
          onChange={ (event) => handleSubmit(event) }
          placeholder="Digite sua senha"
        />
        <button
          type="submit"
          onClick={ (event) => {
            event?.preventDefault();
            localStorage.setItem('user', JSON.stringify({ email: userLogin.user.email }));
            navigate('/meals');
          } }
          disabled={ disabled }
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
