import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from '../components/SearchBar';

function Header({ route, favorite }: any) {
  console.log('header', favorite);
  const [searchInput, setSearchInput] = useState(false);
  const navigate = useNavigate();

  const toggleSearchInput = () => setSearchInput(!searchInput);

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  return (
    <header>
      <h1 data-testid="page-title">{route || favorite }</h1>

      { searchInput ? (<SearchBar rota={ route } />) : null}

      {(route === 'Meals' || route === 'Drinks') && (
        <button onClick={ toggleSearchInput }>
          <img src={ search } alt="search" data-testid="search-top-btn" />
        </button>
      )}

      <button onClick={ handleProfileButtonClick }>
        <img src={ profile } alt="profile" data-testid="profile-top-btn" />
      </button>
    </header>
  );
}

export default Header;
