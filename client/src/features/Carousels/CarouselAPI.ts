import { PaginationServerResponse } from "@/types";
import axios from "axios";

export async function fetchCarousels({ format = 'table', page, title }: FetchCarouselsOptions) {
  const response = await axios.get<PaginationServerResponse<Carousel>>(`/api/carruseles`, {
    params: { format, page, title },
  });
  return response.data;
}

export async function fetchCarousel(id: number | string) {
  const { data } : { data: Carousel } = await axios.get(`/api/carruseles/${id}`);
  return data;
}

export async function patchCarousel(id: number | string, carousel: CarouselFormValues | CarouselFormValues) {
  return await axios.patch(`/api/carruseles/${id}`, carousel);
}

export async function createCarousel(carousel: CarouselFormValues) {
  return await axios.post('/api/carruseles', carousel);
}

export async function deleteCarousel(carousel: Partial<Carousel>) {
  return await axios.delete(`/api/carruseles/${carousel.id}`);
}
