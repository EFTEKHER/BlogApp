import React, { useState, useEffect } from 'react';

const BlogForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded shadow">
      <h2 className="text-xl mb-4">{initialData ? 'Edit Blog' : 'Create Blog'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border mb-4"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border mb-4"
        rows="5"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Update Blog' : 'Create Blog'}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default BlogForm;
