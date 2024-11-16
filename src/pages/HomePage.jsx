import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';


const HomePage = () => {

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to car management system</h1>
      <p className="text-gray-700 mb-8">
        Manage your car inventory and sales with ease.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;