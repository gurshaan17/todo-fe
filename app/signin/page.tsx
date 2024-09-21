"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter from next/navigation

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();  // Initialize the useRouter hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/user/login", formData);
      setSuccess('Logged in successfully!');
      setError('');
      
      // Redirect to the /tasks page after successful login
      router.push('/tasks');
    } catch (error) {
      setError('Error signing in. Please check your credentials.');
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-36 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 flex justify-center pb-4">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="userId">Email or Username</label>
            <input
              className="border w-full p-2 rounded"
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">Password</label>
            <input
              className="border w-full p-2 rounded"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded w-full" type="submit">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/signup" className="text-blue-500 hover:underline">
            New user? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;