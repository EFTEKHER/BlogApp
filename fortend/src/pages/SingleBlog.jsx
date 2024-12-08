import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`https://backendbloggy.onrender.com/api/blog/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [id]);

    return (
        <div className="p-8">
            {blog ? (
                <div className="bg-gray-800 p-6 rounded-md">
                    <h2 className="text-3xl font-bold text-white">{blog.title}</h2>
                    <p className="text-gray-300 mt-4">{blog.content}</p>
                </div>
            ) : (
                <p className="text-white">Loading...</p>
            )}
        </div>
    );
};

export default SingleBlog;
