import fetchWrapper from "./fetchWrapper";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
}

export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  birth_date: string;
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
