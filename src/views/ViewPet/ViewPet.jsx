import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


const LinkButton = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const ViewPet = () => {
  const { _id } = useParams();
  const [pet, setPet] = useState({});
  const [likes, setLikes] = useState(0);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://despliegue-8zoh.onrender.com/api/pets/${_id}`)
      .then(res => setPet(res.data.pet))
      .catch(err => setError('Error getting pet details.'));
  }, [_id]);

  const adoptPet = () => {
    axios.delete(`https://despliegue-8zoh.onrender.com/api/pets/delete/${_id}`)
      .then(res => {
        setMessage(`You have adopted ${pet.name}`);
        setTimeout(() => navigate("/"), 3000);
      })
      .catch(err => {
        setMessage('Failed to adopt the pet');
        setError('Could not adopt the pet.');
      });
  };

  const incrementLikes = () => {
    setLikes(likes + 1);
    setLikeDisabled(true);
  };

  return (
    <div className="form-container">
      <h2>Details about: {pet.name}</h2>
      <p>Type: {pet.type}</p>
      <p>Description: {pet.description}</p>
      <p>Skills: {[pet.skillOne, pet.skillTwo, pet.skillThree].filter(Boolean).join(', ')}</p>
      <button className="btn btn-success" onClick={adoptPet}>Adopt {pet.name}</button>
      <button className="btn btn-danger" onClick={incrementLikes} disabled={likeDisabled}>Like {pet.name} ({likes} Likes)</button>
      {message && <div className={`message ${message.includes('adopted') ? 'success' : 'error'}`}>{message}</div>}
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default ViewPet;
