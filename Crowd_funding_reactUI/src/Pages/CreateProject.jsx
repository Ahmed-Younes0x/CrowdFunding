// src/Pages/CreateProject.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    category: '',
    tags: '',
    target: '',
    start: '',
    end: '',
    pictures: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (key === 'pictures') {
        formData.pictures.forEach(pic => data.append('pictures', pic));
      } else {
        data.append(key, formData[key]);
      }
    }

    await axios.post('/api/projects/create/', data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    alert('Project created!');
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={e => setFormData({ ...formData, title: e.target.value })} />
        <textarea placeholder="Details" onChange={e => setFormData({ ...formData, details: e.target.value })} />
        <input placeholder="Category" onChange={e => setFormData({ ...formData, category: e.target.value })} />
        <input placeholder="Tags (comma-separated)" onChange={e => setFormData({ ...formData, tags: e.target.value })} />
        <input placeholder="Target Amount" type="number" onChange={e => setFormData({ ...formData, target: e.target.value })} />
        <input type="date" onChange={e => setFormData({ ...formData, start: e.target.value })} />
        <input type="date" onChange={e => setFormData({ ...formData, end: e.target.value })} />
        <input type="file" multiple onChange={e => setFormData({ ...formData, pictures: [...e.target.files] })} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProject;
