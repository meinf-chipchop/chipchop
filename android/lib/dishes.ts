import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import fetchWrapper from "./fetchWrapper";
import { getByURL } from "./utils";

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

export interface DishList {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    url: string;
    rating_average: string;
    category: string;
  }[];
}

export async function getCookDishes(cook_id: number): Promise<Dish[]> {
  let dishList = await fetchWrapper(`/api/cooks/${cook_id}/dishes/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<DishList>);

  console.log(dishList);

  let dishes: Dish[] = [];
  for (let dish of dishList.results) {
    dishes.push(await getByURL(dish.url));
  }

  return dishes;
}
