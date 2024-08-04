import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

export default LinkButton;
