import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (!title || !description || !author) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post(
        "/blogs",
        { title, content: description, author },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Blog added successfully:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding blog:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Failed to add blog.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddBlog}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter blog title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter blog description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter author name"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
