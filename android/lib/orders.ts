import fetchWrapper from "./fetchWrapper";
import { Address, UserDetail } from "./users";
import { getByURL } from "./utils";
import { Dish, DishList} from "./dishes"
import { getCsrfToken, Me } from "./auth";


export interface genericPaging {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    url: string;
  }>;
}

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
  deliverer_id: number | null;
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

export interface OrderList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}

export async function getOrderHistory(): Promise<Order[]> {
  const orderList = await fetchWrapper(`/api/orders/`, {

  method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<OrdersList>);

  const ordersWithDetails = await Promise.all(
    orderList.results.map(async (orderItem) => {
      // Busca o pedido usando a URL
      const order = await getByURL(orderItem.url) as Order;

      // Garante que o ID seja recuperado
      const id = order.id ?? parseInt(orderItem.url.split('/').filter(Boolean).pop() || '0', 10);

      // Busca os detalhes do usuário
      let firstName = "";
      if (order.user) {
        const user = await getByURL(order.user) as { first_name: string };
        firstName = user.first_name;
      }

      // Busca os detalhes dos pratos
      const dishesDetails = await getDishesFromOrder(order);

      return {
        ...order,
        id, // Garante que o ID seja único
        firstName, 
        dishesDetails,
      };
    })
  );

  return ordersWithDetails;
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
      // Busca o pedido usando a URL
      const order = await getByURL(orderItem.url) as Order;

      // Garante que o ID seja recuperado
      const id = order.id ?? parseInt(orderItem.url.split('/').filter(Boolean).pop() || '0', 10);

      // Busca os detalhes do usuário
      let firstName = "";
      if (order.user) {
        const user = await getByURL(order.user) as { first_name: string };
        firstName = user.first_name;
      }

      // Busca os detalhes dos pratos
      const dishesDetails = await getDishesFromOrder(order);

      return {
        ...order,
        id, // Garante que o ID seja único
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
  }).then((response) => response.json() as Promise<genericPaging>);

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


export async function updateOrderStatus(id: number, order_status: string): Promise<Order> {
  const url = `/api/orders/${id}/`;

  // Aguarda a resolução do token CSRF
  const csrfToken = await getCsrfToken();

  const updatedOrder = await fetchWrapper(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken ?? "",
    },
    credentials: "include",
    body: JSON.stringify({ order_status }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to update order status. Status: ${response.status}`);
    }
    return response.json() as Promise<Order>;
  });

  return updatedOrder;
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
    },
    credentials: "include",
  });
  
  return res.then((response) => response.ok);
}

export async function updateStatus(order: Order, newStatus: string): Promise<Order> {
  const res = fetchWrapper(`/api/orders/${order.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": await getCsrfToken(),
    },
    credentials: "include",
    body: JSON.stringify({ order_status: newStatus }),
  });

  order.order_status = newStatus;

  return res.then(_ => {return order });
}
