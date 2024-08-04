import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const PetInfo = ({ pet }) => {
  return (
    <tr>
      <td>{pet.name}</td>
      <td>{pet.type}</td>
      <td>
        <LinkButton to={`/pets/${pet._id}`} className="btn btn-primary">View</LinkButton>
        <LinkButton to={`/pets/update/${pet._id}`} className="btn btn-secondary">Edit</LinkButton>
      </td>
    </tr>
  );
};

export default PetInfo;
