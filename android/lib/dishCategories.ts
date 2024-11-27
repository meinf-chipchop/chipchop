import fetchWrapper from "./fetchWrapper";
import { getByURL } from "./utils";

export interface DishCategory {
  id: number;
  name: string;
  image_url: string;
}

export interface DishCategoryList {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    url: string;
    name: string;
    image_url: string;
  }[];
}

export async function getDishCategories(): Promise<DishCategory[]> {
  let dishCategoryList = await fetchWrapper(`/api/dish-categories/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<DishCategoryList>);

  let dishCategories = await Promise.all(
    dishCategoryList.results.map((dish) =>
      getByURL(dish.url)
    ) as Promise<DishCategory>[]
  );

  return dishCategories;
}
