import { getCsrfToken, Me } from "./auth";
import { DishList } from "./dishes";

import fetchWrapper from "./fetchWrapper";
import { Address, UserDetail } from "./users";
import { getByURL } from "./utils";

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
  deliverer_id: number | null;
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

export interface OrderList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
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
  }).then((response) => response.json() as Promise<genericPaging>);

  let dishes = await Promise.all(
    dishList.results.map((dish) => getByURL(dish.url)) as Promise<OrderDish>[]
  );

  return dishes;
}

export async function getOrderDishesByUrl(dishes_url: string): Promise<OrderDish[]> {
  let dishPaging = await getByURL<genericPaging>(dishes_url);

  let dishes = await Promise.all(
    dishPaging.results.map((dish) => getByURL(dish.url)) as Promise<OrderDish>[]
  );

  return dishes;
}

export async function getOrders(): Promise<OrderList> {
  let orders = await fetchWrapper(`/api/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<OrderList>);

  return orders;
}

export async function getFullOrders(): Promise<Order[]> {
  let orders = await fetchWrapper(`/api/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<genericPaging>);

  const results = [];
  const normalize_order = async (order_url: string): Promise<Order> => {
    const order = await getByURL<Order>(order_url);
    const user = await getByURL<UserDetail>(order.user);
    const address = await getByURL<Address>(order.address);
    const dishes = await getOrderDishesByUrl(order.dishes);

    order.user = user.first_name + " " + user.last_name;
    order.address = address.street + ", " + address.city + ", " + address.zip_code;
    order.dish_list = dishes;
    return order;
  }

  for (let i = 0; i < orders.results.length; i++) {
    const order = orders.results[i];
    results.push(await normalize_order(order.url));
  }

  return results;
}

export async function acceptOrder(order_id: number, deliverer: Me): Promise<Boolean> {
  const res = fetchWrapper(`/api/orders/${order_id}/accept`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken(),
    },
    credentials: "include",
  });
  
  return res.then((response) => response.ok);
}