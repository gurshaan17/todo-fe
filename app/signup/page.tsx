"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/user/signup", formData);
      setSuccess('User signed up successfully!');
      setError('');
      // Handle success (e.g., redirect, show success message, etc.)
    } catch (error) {
      setError('Error signing up. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-36 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 flex justify-center pb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">Username</label>
            <input
              className="border w-full p-2 rounded"
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">Email</label>
            <input
              className="border w-full p-2 rounded"
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/signin" className="text-blue-500 hover:underline">
            Existing user? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;