import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AddService = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services', { title, description });
      alert('Service added successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Add New Service</h2>
      <form onSubmit={handleAddService}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded" type="submit">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
