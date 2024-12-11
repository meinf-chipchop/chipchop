import fetchWrapper from "./fetchWrapper";
import { NewUser, User } from "./auth";

export interface NewCook {
  public_name: string;
  user: NewUser;
}

export interface Cook {
  public_name: string;
  user: User;
}

export interface CookOverall {
  url: string;
  public_name: string;
  rating_average: number;
}

export interface CooksPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: CookOverall[];
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

export function getCook(cookId: number): Promise<Cook> {
  return fetchWrapper(`/api/cooks/${cookId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json() as Promise<Cook>);
}

export async function getCooks(): Promise<Cook[]> {
  const cookList = await fetchWrapper("/api/cooks/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  const cooks: Cook[] = [];

  cookList.forEach(async (cook: { url: string }) => {
    cooks.push(await getCookByURL(cook.url));
  });

  return cooks;
}

export function getCookByURL(cookURL: string): Promise<Cook> {
  return fetch(cookURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json() as Promise<Cook>);
}

