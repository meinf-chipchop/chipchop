import { getCsrfToken } from "./auth";
import { DishList } from "./dishes";

import fetchWrapper from "./fetchWrapper";
import { getByURL } from "./utils";

export interface OrderList {
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

export interface genericPaging {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    url: string;
  }>;
}

export interface Order {
  id: number;
  user: string;
  deliverer: string | null;
  address: string;
  dishes: string;
  order_type: string;
  order_status: string;
  created_at: string;
  last_updated: string;
  dish_list: OrderDish[];
  total_price: number;
}

export interface OrderDish {
  order: string;
  dish: string;
  amount: number;
  price: string;
  note: string;
}

export async function getOrderHistory(): Promise<Order[]> {
  let orderList = await fetchWrapper(`/api/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<genericPaging>);

  let orders = await Promise.all(
    orderList.results.map(async (dish) => {
      let order: Order = await getByURL(dish.url);
      order.dish_list = await getOrderDishes(order.id);
      order.total_price = order.dish_list.reduce(
        (acc, dish) => acc + parseFloat(dish.price) * dish.amount,
        0
      );
      return order;
    }) as Promise<Order>[]
  );

  return orders;
}

export async function getOrderDishes(order_id: number): Promise<OrderDish[]> {
  let dishList = await fetchWrapper(`/api/orders/${order_id}/dishes/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<DishList>);

  let dishes = await Promise.all(
    dishList.results.map((dish) => getByURL(dish.url)) as Promise<OrderDish>[]
  );

  return dishes;
}
