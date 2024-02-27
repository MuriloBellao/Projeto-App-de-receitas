import React from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Header from './Header';
import { addIsdrinkAction } from '../redux/actions';

function Drinks() {
  const dispatch = useDispatch();
  dispatch(addIsdrinkAction(true));

  return (
    <>
      <Header route="Drinks" />
      <h1>Você está na tela de receitas de bebidas</h1>
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;
