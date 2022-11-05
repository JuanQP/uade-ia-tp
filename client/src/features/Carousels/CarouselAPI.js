import axios from "axios";

export async function fetchCarousels({ format = 'table', page }) {
  const response = await axios.get(`/api/carruseles`, {
    params: { format, page },
  });
  return response.data;
}

export async function fetchCarousel(id) {
  const { data } = await axios.get(`/api/carruseles/${id}`);
  return data;
}

export async function patchCarousel(id, carousel) {
  return await axios.patch(`/api/carruseles/${id}`, carousel);
}

export async function createCarousel(carousel) {
  return await axios.post('/api/carruseles', carousel);
}

export async function deleteCarousel(carousel) {
  return await axios.delete(`/api/carruseles/${carousel.id}`);
}
