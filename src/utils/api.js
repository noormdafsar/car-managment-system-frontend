import { getToken } from './auth';

const API_BASE_URL = '/api/cars';

const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const getCars = async () => {
  const response = await fetch(`${API_BASE_URL}/getallcars`, {
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch cars');
  const data = await response.json();
  return data.cars;
};

export const createCar = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data.car;
};

export const getCarDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/car/${id}`, {
    headers: getHeaders()
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch car details');
  }
  return data.car;
};


export const updateCar = async (id, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/car/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update car');
    }

    return data.car;
  } catch (error) {
    throw new Error(`Update failed: ${error.message}`);
  }
};

export const deleteCar = async (id) => {
  const response = await fetch(`${API_BASE_URL}/car/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const searchCars = async (keyword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/search?keyword=${encodeURIComponent(keyword)}`, {
      headers: getHeaders()
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.cars;
  } catch (error) {
    throw new Error(`Search failed: ${error.message}`);
  }
};


