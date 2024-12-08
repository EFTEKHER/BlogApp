import React from 'react';

const BlogList = ({ blogs, onEdit, onDelete }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id} className="p-4 border mb-4 rounded shadow">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p>{blog.content}</p>
          <div className="mt-4 flex space-x-4">
            {onEdit && (
              <button
                onClick={() => onEdit(blog)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(blog._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
