import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarDetails, deleteCar } from '../utils/api';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const data = await getCarDetails(id);
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <img
          src={car.images[0].url}
          alt={car.title}
          className="w-full h-64 object-cover mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{car.title}</h1>
        <p className="text-gray-700 mb-4">{car.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-bold">Car Type:</p>
            <p>{car.carType}</p>
          </div>
          <div>
            <p className="font-bold">Company:</p>
            <p>{car.company}</p>
          </div>
          <div>
            <p className="font-bold">Dealer:</p>
            <p>{car.dealerName}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            onClick={() => navigate(`/car/${id}/edit`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;