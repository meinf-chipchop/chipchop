import fetchWrapper from "./fetchWrapper";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
}

export interface Me {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  phone: string;
  age: number;
  banned: boolean;
}

export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
}

export function getCsrfToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken"))
    ?.split("=")[1];
}

export function logout() {
  return fetchWrapper("/api/logout/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export function me(): Promise<Me> {
  return fetchWrapper("/api/users/me/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json() as Promise<Me>);
}

export function login(email: string, password: string) {
  return fetchWrapper("/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
}

export function register(user: NewUser) {
  return fetchWrapper("/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}
