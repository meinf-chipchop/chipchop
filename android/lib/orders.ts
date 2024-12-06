import fetchWrapper from "./fetchWrapper";
import { getByURL } from "./utils";
import {Dish} from "./dishes"

export interface OrdersList {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    url: string;
    dishes: string;
    address: string;
    deliverer: string | null;
    firstName: string;
    order_type: string;
    order_status: string;
  }[];
}

export interface Order {
  dishesDetails: any;
  id: number;
  user: string;
  dishes: string;
  address: string;
  deliverer: string | null;
  firstName: string;
  order_type: string;
  order_status: string;
  created_at: string;
  last_updated: string;
}


export interface OrderDishesList {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    url: string;
    order: string | null;
    dish: string | null;
    amount: number;
    price: number;
    note: string | null
  }[];
}

export interface OrderDishesInstance {
  order: string | null;
  dish: string | null;
  amount: number;
  price: number;
  note: string | null
}



export async function getOrdersWithDishesAndUser(): Promise<(Order & { dishesDetails: (OrderDishesInstance & { dishDetails: Dish | null, id: string })[], firstName: string })[]> {
  const orderList = await fetchWrapper(`/api/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<OrdersList>);

  const ordersWithDetails = await Promise.all(
    orderList.results.map(async (orderItem) => {

      // Request the order
      const order = await getByURL(orderItem.url) as Order;

      // Search details from the user
      let firstName = "";
      if (order.user) {
        const user = await getByURL(order.user) as { first_name: string };
        firstName = user.first_name;
      }

      // Search details from the dishes
      const dishesDetails = await getDishesFromOrder(order);

      return {
        ...order,
        id: order.id, 
        firstName, 
        dishesDetails,
      };
    })
  );

  return ordersWithDetails;
}




export async function getDishesFromOrder(order: Order): Promise<(OrderDishesInstance & { dishDetails: Dish | null, id: string })[]> {
  if (!order.dishes) {
    throw new Error("No dishes URL provided in the order.");
  }

  const dishesList = await fetch(order.dishes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<OrderDishesList>);

  const resultsWithDetails = await Promise.all(
    dishesList.results.map(async (dishItem, index) => {
      // Busca os dados do OrderDishesInstance
      const orderDishInstance = await getByURL(dishItem.url) as OrderDishesInstance;

      // Busca os dados do Dish usando a URL do prato
      let dishDetails: Dish | null = null;
      if (orderDishInstance.dish) {
        dishDetails = await getByURL(orderDishInstance.dish) as Dish;
      }

      return {
        ...orderDishInstance,
        dishDetails, // Inclui os detalhes do prato
        id: `${order.id}-${index}`, // Cria uma chave única baseada no pedido e no índice
      };
    })
  );

  return resultsWithDetails;
}



