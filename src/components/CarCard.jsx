import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCar } from '../utils/api';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(car._id);
        navigate('/dashboard', { replace: true });
        window.location.reload();
      } catch (err) {
        console.error('Failed to delete car: ', err);
      }
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={car.images[0].url}
        alt={car.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{car.title}</h3>
        <p className="text-gray-700 mb-4">{car.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">{car.carType}</p>
          <Link
            to={`/car/${car._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View
          </Link>
          <button
              onClick={handleDelete}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;