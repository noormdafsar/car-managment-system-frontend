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
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative pb-[56.25%]">
        <img
          src={car.images[0].url}
          alt={car.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{car.title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-2 flex-1">{car.description}</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-gray-500">{car.carType}</p>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link
              to={`/car/${car._id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex-1 sm:flex-none text-center"
            >
              View
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex-1 sm:flex-none"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;