import axios from "axios";

export async function login(email: string, password: string) {
  const { data }: { data: Required<User> } = await axios.post('/api/login', {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  localStorage.setItem('nombre', data.nombre);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  return data;
}

export async function logout() {
  const result = await axios.post('/api/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('nombre');
  axios.defaults.headers.common['Authorization'] = ``;
  return result;
}

export async function register(user: User) {
  return await axios.post('/api/register', user);
}

export async function verifyToken() {
  try {
    const token = localStorage.getItem('token');
    if(!token) {
      throw new Error("Es necesario iniciar sesión para usar esta aplicación");
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await axios.post('/api/verify');
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    axios.defaults.headers.common['Authorization'] = ``;
    throw error;
  }
}
