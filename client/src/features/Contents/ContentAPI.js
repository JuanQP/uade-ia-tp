import axios from "axios";

export async function fetchContents({ title, format = 'table' }) {
  const response = await axios.get(`/api/contenidos`, {
    params: { title, format },
  });
  return response.data.results;
}

export async function fetchContent(id) {
  const { data } = await axios.get(`/api/contenidos/${id}`);
  return data;
}

export async function patchContent(id, content) {
  return await axios.patch(`/api/contenidos/${id}`, content);
}

export async function createContent(content) {
  return await axios.post('/api/contenidos', content);
}

export async function deleteContent(content) {
  return await axios.delete(`/api/contenidos/${content.id}`);
}

export async function fetchGenres(description) {
  const response = await axios.get('/api/generos', {
    params: { description }
  });
  return response.data.generos;
}

export async function fetchMaturityRatings(description) {
  const response = await axios.get('/api/maturity-ratings', {
    params: { description }
  });
  return response.data.maturity_ratings;
}
