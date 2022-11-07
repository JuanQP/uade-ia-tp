import { PaginationServerResponse } from "@/types";
import axios from "axios";


export async function fetchContents({ title, format = 'table', page }: Partial<FetchContentsOptions>) {
  const response = await axios.get<PaginationServerResponse<Content>>(`/api/contenidos`, {
    params: { title, format, page },
  });
  return response.data;
}

export async function fetchContent(id: number) {
  const { data } = await axios.get<Required<Content>>(`/api/contenidos/${id}`);
  return data;
}

export async function patchContent(id: number, content: Content) {
  return await axios.patch(`/api/contenidos/${id}`, content);
}

export async function createContent(content: Content) {
  return await axios.post('/api/contenidos', content);
}

export async function deleteContent(content: Content) {
  return await axios.delete(`/api/contenidos/${content.id}`);
}

export async function fetchGenres(description: string) {
  const response = await axios.get('/api/generos', {
    params: { description }
  });
  return response.data.generos;
}

export async function fetchMaturityRatings(description: string) {
  const response = await axios.get('/api/maturity-ratings', {
    params: { description }
  });
  return response.data.maturity_ratings;
}
