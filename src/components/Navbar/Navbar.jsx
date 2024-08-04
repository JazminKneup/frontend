import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LinkButton from '../LinkButton/LinkButton';

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="nav">
      <h1 className="site-title">Pet Shelter</h1>
      {location.pathname === '/' ? (
        <LinkButton to="/pets/new" className="btn btn-primary create-btn">Add a Pet to the Shelter</LinkButton>
      ) : (
        <Link to="/" className="btn btn-secondary back-btn">Back to Home</Link>
      )}
    </div>
  );
};

export default NavBar;
