export interface Dish {
  name: string;
  description: string;
  category: string;
  image_url: string;
  rating_average: string;
  rating_count: string;
  estimated_time: string;
  price: number;
  discount: number;
  created_at: string;
  last_update_at: string;
}

export async function getDishByURL(url: string): Promise<Dish> {
  return fetch(url).then((response) => response.json() as Promise<Dish>);
}
