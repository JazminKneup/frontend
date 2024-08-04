import React, { useState } from 'react';
import axios from 'axios';
import PetForm from '../../components/PetForm/PetForm';
import { useNavigate } from 'react-router-dom';

const AddPet = () => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    description: '',
    skillOne: '',
    skillTwo: '',
    skillThree: '',
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (form.name.length < 3) newErrors.name = 'Name must be at least 3 characters long.';
    if (form.type.length < 3) newErrors.type = 'Type must be at least 3 characters long.';
    if (form.description.length < 3) newErrors.description = 'Description must be at least 3 characters long.';

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios.post("https://despliegue-8zoh.onrender.com/api/pets/new", form)
      .then(res => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setForm({
            name: '',
            type: '',
            description: '',
            skillOne: '',
            skillTwo: '',
            skillThree: '',
          });
          navigate('/');
        }
      })
      .catch(err => {
        console.log("Error details:", err.response);
        if (err.response && err.response.data) {
          if (err.response.data.message) {
            setError({ message: err.response.data.message });
          } else if (err.response.data.errors) {
            setError(err.response.data.errors);
          }
        } else {
          setError({ message: "An error occurred. Please try again later." });
        }
      });
  };

  return (
    <div className="container">
      <h4>Add a new pet</h4>
      <PetForm
        form={form}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        error={error}
      />
      {error.message && <p className="text-danger">{error.message}</p>}
    </div>
  );
};

export default AddPet;
