import fetchWrapper from "./fetchWrapper";
import { NewUser, User } from "./auth";

export enum TransportEnum {
  CAR = "C",
  BICYCLE = "B",
  SCOOTER = "S",
}

export interface NewDeliverer {
  transport: TransportEnum;
  user: NewUser;
}

export interface Deliverer {
  transport: TransportEnum;
  user: User;
  rating_average: string;
  rating_count: string;
}

export function createDeliverer(deliverer: NewDeliverer) {
  return fetchWrapper("/api/deliverers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deliverer),
  });
}

export function getDeliverer(delivererId: number): Promise<Deliverer> {
  return fetchWrapper(`/api/deliverers/${delivererId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json() as Promise<Deliverer>);
}

export async function getDeliverers(limit: number = 10, offset: number = 0): Promise<Deliverer[]> {
  const response = await fetchWrapper(`/api/deliverers/?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const delivererList = await response.json();

  return delivererList.results.map((deliverer: any) => ({
    transport: deliverer.transport as TransportEnum,
    user: {
      id: deliverer.user.id,
      first_name: deliverer.user.first_name || "",
      last_name: deliverer.user.last_name || "",
      email: deliverer.user.email || "",
      role: deliverer.user.role,
      phone: deliverer.user.phone || "",
      age: deliverer.user.age,
      banned: deliverer.user.banned,
    },
  }));
}
