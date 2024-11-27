import { getCsrfToken } from "./auth";
import fetchWrapper from "./fetchWrapper";
import { getByURL } from "./utils";

export interface DishList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    url: string;
    dishes: string;
    address: string;
    deliverer: string | null;
    first_name: string;
    order_type: string;
    order_status: string;
  }>;
}

export interface Order {
  user: string;
  deliverer: string | null;
  address: string;
  dishes: string;
  order_type: string;
  order_status: string;
  created_at: string;
  last_updated: string;
}

export async function getOrderHistory(): Promise<Order[]> {
  let dishList = await fetchWrapper(`/api/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<DishList>);

  let dishes = await Promise.all(
    dishList.results.map((dish) => getByURL(dish.url)) as Promise<Order>[]
  );

  return dishes;
}
