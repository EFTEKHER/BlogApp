import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { user, token } = useContext(AuthContext); // Access user and token from context
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/blogs', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBlogs(response.data);
        } catch (err) {
          console.error(err);
          setError('Failed to fetch blogs. Please try again.');
        }
      };
      fetchBlogs();
    }
  }, [token, navigate]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!blogs.length) {
    return <div className="text-gray-500 text-center">No blogs available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">All Blogs</h1>
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-6 bg-white shadow rounded">
            <Link to={`/blogs/${blog._id}`}>
              <h2 className="text-xl font-bold text-blue-600 hover:underline">
                {blog.title}
              </h2>
            </Link>
            <p className="text-gray-700 mt-2">
              {blog.content.substring(0, 100)}...
            </p>
            <p className="text-sm text-gray-500 mt-4">Author: {blog.author?.username || 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
