import { CartItem } from "@/context/cartContext";
import {
  BaseHyperlinkedModel,
  BaseIdentifiedModel,
  GenericPaging,
  get,
  getDetailed,
  patch,
  post,
  put,
  requestResponse,
} from "./rest";

import { Address, UserDetail } from "./users";

export type OrderStatus =
  | "P"
  | "A"
  | "R"
  | "C"
  | "B"
  | "K"
  | "D"
  | "T"
  | "S"
  | "F";
export type OrderType = "D" | "P";

export interface NewOrder extends BaseHyperlinkedModel {
  order_type: OrderType;
  address: Address | undefined;
  cartItems: CartItem[];
}

export interface OrderDetail extends BaseIdentifiedModel {
  user: UserDetail;
  deliverer: string | null;
  deliverer_id?: number;
  dishes: string;
  dish_count: number;
  total_price: number;
  address: string;
  order_type: OrderType;
  order_status: OrderStatus;
  created_at: string;
  last_updated: string;
}

export interface OrderOverall extends BaseHyperlinkedModel {
  dishes: string;
  deliverer: string | null;
  first_name: string;
  order_type: string;
  order_status: string;
}

export interface OrderDishesDetail {
  order: string;
  dish: string;
  amount: number;
  price: number;
  note: string | null;
}

export interface OrderDishesOverall extends BaseHyperlinkedModel {}

export interface OrderList extends GenericPaging<OrderOverall> {}
export interface OrderDishesList extends GenericPaging<OrderDishesOverall> {}

export interface OrderDetailWithDishes extends OrderDetail {
  dishesDetails: Array<OrderDishesDetail>;
}

export async function newOrder(
  newOrder: NewOrder
): Promise<OrderDishesDetail[]> {
  let orderWithDishes: OrderDetailWithDishes;
  try {
    const order = await post<NewOrder>("/api/orders/", {
      order_type: newOrder.order_type,
      address: newOrder.address?.url,
    });

    orderWithDishes = await get<OrderDetailWithDishes>(order.url);
  } catch (error) {
    console.error("[orders] Error creating order: ", error);
    throw error;
  }
  try {
    const results = Promise.all(
      newOrder.cartItems.map(async (item) => {
        return await post<OrderDishesDetail>(orderWithDishes.dishes, {
          dish: item.dish,
          amount: item.units,
          note: "",
        });
      })
    );
    return results;
  } catch (error) {
    console.error("[orders] Error creating order with dishes: ", error);
    throw error;
  }
}

export async function getOrderHistory(): Promise<OrderDetailWithDishes[]> {
  const orders = await getDetailed<OrderOverall, OrderDetail>("/api/orders/");
  return Promise.all(
    orders.map(async (order) => {
      return {
        ...order,
        dishesDetails: await getOrderDishesByUrl(order.dishes),
      };
    })
  );
}

export async function updateOrderStatus(
  id: number,
  order_status: string
): Promise<OrderDetail> {
  return await patch<OrderDetail>(`/api/orders/${id}/`, { order_status });
}

export async function getOrderDishesByUrl(
  dishes_url: string
): Promise<OrderDishesDetail[]> {
  return await getDetailed<OrderDishesOverall, OrderDishesDetail>(dishes_url);
}

export async function getOrders(): Promise<OrderList> {
  return get<OrderList>("api/orders/");
}

export async function getOrdersDetailed(): Promise<Array<OrderDetail>> {
  return await getDetailed<OrderOverall, OrderDetail>("/api/orders/");
}

export async function acceptOrder(order_id: number): Promise<Boolean> {
  return await requestResponse(`/api/orders/${order_id}/accept`, "GET").then(
    (response) => response.ok
  );
}

export async function updateStatus(
  order: OrderDetail,
  order_status: string
): Promise<{ order_status: OrderStatus }> {
  return await put<OrderDetail>(`/api/orders/${order.id}/`, { order_status });
}
