import fetchWrapper from "./fetchWrapper";
import { NewUser, User } from "./auth";

export interface NewCook {
  public_name: string;
  user: NewUser;
}

export interface Cook {
  public_name: string;
  user: User;
  url: string;
}

export interface CookDetailed {
  public_name: string;
  user: User;
  dishes_url: string;
  rating_average: number;
  rating_count: number;
}

export function createCook(cook: NewCook) {
  return fetchWrapper("/api/cooks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cook),
  });
}

export function getCook(cookId: string): Promise<Cook> {
  return fetchWrapper(`/api/cooks/${cookId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json() as Promise<Cook>);
}

export function getCookByURL(cookURL: string): Promise<CookDetailed> {
  return fetch(cookURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json() as Promise<CookDetailed>);
}

export async function getCooks(): Promise<Cook[]> {
  const cooks = await fetchWrapper("/api/cooks/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  return cooks["results"];
}
