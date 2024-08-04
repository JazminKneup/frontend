import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../views/Home/Home'; 
import AddPet from '../../views/AddPet/AddPet'; 
import ViewPet from '../../views/ViewPet/ViewPet'; 
import UpdatePet from '../../views/UpdatePet/UpdatePet';
import NavBar from '../Navbar/Navbar'; 
import io from 'socket.io-client';
import axios from 'axios';


axios.defaults.withCredentials = true;


const socket = io('https://despliegue-8zoh.onrender.com/', {
  transports: ['websocket'],
  pingInterval: 25000,
  pingTimeout: 20000,
  withCredentials: true
});

const App = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // eventos de Socket.IO
    socket.on('connect', () => {
      console.log('Connected to Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO');
    });

    socket.on('new_pet', (newPet) => {
      setPets(prevPets => [...prevPets, newPet]);
    });

    socket.on('update_pet', (updatedPet) => {
      setPets(prevPets =>
        prevPets.map(pet =>
          pet._id === updatedPet._id ? updatedPet : pet
        )
      );
    });

    socket.on('pet_deleted', (petId) => {
      setPets(prevPets =>
        prevPets.filter(pet => pet._id !== petId)
      );
    });

    // Limpia eventos de Socket.IO al desmontar el componente
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('new_pet');
      socket.off('update_pet');
      socket.off('pet_deleted');
    };
  }, []);

  useEffect(() => {
    axios.get('https://despliegue-8zoh.onrender.com/api/pets')
      .then(res => setPets(res.data.pets.sort((a, b) => a.type.localeCompare(b.type))))
      .catch(err => console.log(err));
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home pets={pets} setPets={setPets} />} />
        <Route path="/pets/new" element={<AddPet />} />
        <Route path="/pets/:_id" element={<ViewPet />} />
        <Route path="/pets/update/:_id" element={<UpdatePet />} />
      </Routes>
    </Router>
  );
};

export default App;
