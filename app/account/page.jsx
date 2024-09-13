"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"; // Updated import for Next.js 13+
import axios from 'axios'; // Adjust if using another HTTP client

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user details from API or local storage
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/account/login'); // Redirect if no token
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/blog/user/profile/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
        router.push('/account/login'); 
        console.error(err);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove token from local storage
    router.push('/account/login'); // Redirect to login page
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Account Details</h1>
          <div className="space-y-4">
            <p className="text-lg">
              <strong className="text-gray-700">Email:</strong> 
              <span className="text-gray-900">{user.email}</span>
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">First Name:</strong> 
              <span className="text-gray-900">{user.first_name}</span>
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Last Name:</strong> 
              <span className="text-gray-900">{user.last_name}</span>
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Date Joined:</strong> 
              <span className="text-gray-900">{new Date(user.date_joined).toLocaleDateString()}</span>
            </p>
          </div>
          <button 
            onClick={handleLogout} 
            className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>

  );
};

export default AccountPage;
