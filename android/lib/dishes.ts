import { getCsrfToken } from "./auth";
import fetchWrapper from "./fetchWrapper";
import { getByURL } from "./utils";

export interface Dish {
  id: number;
  user_id: number;
  name: string;
  description: string;
  category: number;
  image_url?: string;
  rating_average?: string;
  rating_count?: string;
  estimated_time?: string;
  price: number;
  discount?: number;
  created_at?: string;
  last_update_at?: string;
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

  let dishes = await Promise.all(
    dishList.results.map((dish) => getByURL(dish.url)) as Promise<Dish>[]
  );

  return dishes;
}

export async function createCookDish(
  cook_id: number,
  dish: Dish
): Promise<Dish> {
  let createdDish = await fetchWrapper(`/api/cooks/${cook_id}/dishes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken() ?? "",
    },
    credentials: "include",
    body: JSON.stringify(dish),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create dish");
    }
    return response.json() as Promise<Dish>;
  });

  return createdDish;
}

export async function getDish(cook_id: number, dish_id: number): Promise<Dish> {
  return fetchWrapper(`/api/cooks/${cook_id}/dishes/${dish_id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<Dish>);
}

export async function updateDish(
  cook_id: number,
  dish_id: number,
  dish: Dish
): Promise<Dish> {
  return fetchWrapper(`/api/cooks/${cook_id}/dishes/${dish_id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken() ?? "",
    },
    body: JSON.stringify(dish),
    credentials: "include",
  }).then((response) => response.json() as Promise<Dish>);
}
