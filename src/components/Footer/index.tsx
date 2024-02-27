import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footerClass" data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } alt="" data-testid="drinks-bottom-btn" />
      </Link>

      <Link to="/meals">
        <img src={ mealIcon } alt="" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
