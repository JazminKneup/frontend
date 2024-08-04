import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetForm from '../../components/PetForm/PetForm';
import { useNavigate, useParams, Link } from 'react-router-dom';

const UpdatePet = () => {
  const { _id } = useParams();
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

  useEffect(() => {
    axios.get(`https://despliegue-8zoh.onrender.com/api/pets/${_id}`)
      .then(res => setForm(res.data.pet))
      .catch(err => console.log(err));
  }, [_id]);

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

    axios.put(`https://despliegue-8zoh.onrender.com/api/pets/update/${_id}`, form)
      .then(res => {
        if (res.data.error) {
          setError(res.data.error.errors);
        } else {
          navigate('/');
        }
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.errors) {
          setError(err.response.data.errors);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div>
      <h2>Update Pet</h2>
      <PetForm
        form={form}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        error={error}
      />
    </div>
  );
};

export default UpdatePet;