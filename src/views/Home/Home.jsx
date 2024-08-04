import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetInfo from '../../components/PetInfo/PetInfo';

const Home = ({ pets, setPets }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://despliegue-8zoh.onrender.com/api/pets')
      .then(res => setPets(res.data.pets.sort((a, b) => a.type.localeCompare(b.type))))
      .catch(err => console.log(err));
  }, [setPets]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="container">
        <h4>These pets are looking for a good home</h4>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.map((pet, index) => (
            <PetInfo key={index} pet={pet} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

