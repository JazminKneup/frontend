import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const PetForm = ({ onSubmitHandler, onChangeHandler, form, error }) => {
  const [touched, setTouched] = useState({
    name: false,
    type: false,
    description: false
  });

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  return (
    <form className="form-container" onSubmit={(e) => { e.preventDefault(); onSubmitHandler(e); }}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={form.name}
          placeholder="Enter pet's name"
        />
        {(error.name || (touched.name && !form.name)) && (
          <span className="text-danger">{error.name ? error.name : 'Name is required and must be at least 3 characters long.'}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <input
          type="text"
          name="type"
          className="form-control"
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={form.type}
          placeholder="Enter pet's type"
        />
        {(error.type || (touched.type && !form.type)) && (
          <span className="text-danger">{error.type ? error.type : 'Type is required and must be at least 3 characters long.'}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          className="form-control"
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={form.description}
          placeholder="Enter pet's description"
        />
        {(error.description || (touched.description && !form.description)) && (
          <span className="text-danger">{error.description ? error.description : 'Description is required and must be at least 3 characters long.'}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="skillOne">Skill One (Optional)</label>
        <input
          type="text"
          name="skillOne"
          className="form-control"
          onChange={onChangeHandler}
          value={form.skillOne}
          placeholder="Enter first skill"
        />
      </div>
      <div className="form-group">
        <label htmlFor="skillTwo">Skill Two (Optional)</label>
        <input
          type="text"
          name="skillTwo"
          className="form-control"
          onChange={onChangeHandler}
          value={form.skillTwo}
          placeholder="Enter second skill"
        />
      </div>
      <div className="form-group">
        <label htmlFor="skillThree">Skill Three (Optional)</label>
        <input
          type="text"
          name="skillThree"
          className="form-control"
          onChange={onChangeHandler}
          value={form.skillThree}
          placeholder="Enter third skill"
        />
      </div>
      <div className="form-btn-container">
        <input type="submit" value="Add Pet" className="btn btn-primary submit-btn" />
        <LinkButton to="/" className="btn btn-secondary home-btn">Cancel</LinkButton>
      </div>
    </form>
  );
};

export default PetForm;


