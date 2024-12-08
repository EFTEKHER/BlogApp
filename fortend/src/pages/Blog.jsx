import React, { useState, useEffect } from 'react';
import BlogItem from '../components/BlogItem';
import api from '../api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blog');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-6">All Blogs</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogItem key={blog._id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
