import React from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { addIsdrinkAction } from '../redux/actions';
import Header from './Header';

function Meals() {
  const dispatch = useDispatch();
  dispatch(addIsdrinkAction(false));

  return (
    <>
      <Header route="Meals" />
      <h1>Você está na tela de receitas de comidas</h1>
      <Recipes />
      <Footer />
    </>

  );
}

export default Meals;
