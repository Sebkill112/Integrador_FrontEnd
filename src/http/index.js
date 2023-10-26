import axios from 'axios';
const getJwtFromCookie = () => {
  const cookieName = 'jwtToken';
  const cookieValue = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${cookieName}=`));

  if (cookieValue) {
    const token = cookieValue.split('=')[1];

    return token;
  }

  return null;
};

// Crea una instancia de Axios con la configuración base.
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8090', // Reemplaza con la URL de tu API
});

// Intercepta las solicitudes antes de enviarlas.
axiosInstance.interceptors.request.use((config) => {
  const token = getJwtFromCookie();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});



// Crea el método HTTP global.
const http = {
  get: (url) => axiosInstance.get(url),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url, data) => axiosInstance.delete(url),
};

export default http;