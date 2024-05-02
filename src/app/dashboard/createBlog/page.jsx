"use client"
import { useCreatePostMutation  } from '@/redux/service/blog/useApi';
// components/PostForm.js
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { addPost } from '../redux/postsSlice';

const PostForm = () => {
    const [createPost, { isLoading, isError }] = useCreatePostMutation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    mainContent: '',
  });
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formDataSend = new FormData();
    formDataSend.append('img', file);
    for (const key in formData) {
      formDataSend.append(key, formData[key]);
    }
    createPost(formDataSend).unwrap().then((data) => {
        console.log('Post created:', data);
      
      }).catch((error) => {
        console.error('Error creating post:', error);
      });
    setFormData({
          
      title: '',
      description: '',
      
    });
  };
  const [value, setValue] = useState('');
 
  return (
    <div className="flex flex-col justify-center my-5 items-center">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="max-w-lg w-full text-black">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
          required
        />
        <input
          name="img"
          type="file" onChange={handleFileChange}
          placeholder="Image link"
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
          required
        />
         <ReactQuill    className="  text-white" value={value} onChange={setValue} />;
       
 
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
