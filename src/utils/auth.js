export const register = async (name, email, password) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const login = async (email, password) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const logout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      localStorage.removeItem('token');
    } catch (error) {
      throw error;
    }
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const isAuthenticated = () => {
    return !!getToken();
  };
  