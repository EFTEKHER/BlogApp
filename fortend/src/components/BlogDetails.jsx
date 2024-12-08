import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from route
  const { token } = useContext(AuthContext); // Get token from context
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch blog details. Redirecting to home.');
        setTimeout(() => navigate('/'), 3000); // Redirect after 3 seconds
      }
    };

    fetchBlog();
  }, [id, navigate, token]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!blog) {
    return <div className="text-gray-500 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700">{blog.content}</p>
      <div className="text-sm text-gray-500 mt-4">
        <p>Author: {blog.author?.username || 'Anonymous'}</p>
        <p>Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
