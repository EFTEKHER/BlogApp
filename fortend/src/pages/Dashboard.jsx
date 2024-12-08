import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchBlogs = () => {
    axios
      .get('http://localhost:5000/api/blogs/my-blogs', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  const handleCreate = (blog) => {
    axios
      .post('http://localhost:5000/api/blogs', blog, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchBlogs())
      .catch((err) => console.error(err));
  };

  const handleUpdate = (blog) => {
    axios
      .put(`http://localhost:5000/api/blogs/${editingBlog._id}`, blog, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEditingBlog(null);
        fetchBlogs();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchBlogs())
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <BlogForm
        onSubmit={editingBlog ? handleUpdate : handleCreate}
        initialData={editingBlog}
        onCancel={() => setEditingBlog(null)}
      />
      <BlogList blogs={blogs} onEdit={setEditingBlog} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
