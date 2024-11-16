import React, { useState, useEffect } from 'react';
import { getCars, searchCars } from '../utils/api';
import CarCard from '../components/CarCard';

const DashboardPage = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    setLoading(true);
    try {
      const data = await getCars();
      setCars(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (!searchTerm.trim()) {
        await fetchAllCars();
      } else {
        const data = await searchCars(searchTerm);
        setCars(data);
      }
    } catch (error) {
      setError(error.message);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search by ID, title, type, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-3 flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No cars found</div>
      )}
    </div>
  );
};

export default DashboardPage;
