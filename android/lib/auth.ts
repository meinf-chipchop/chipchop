import { Platform } from "react-native";

import { NewCook, createCook } from "./cook";
import { NewDeliver, createDeliver } from "./delivery";

import fetchWrapper from "./fetchWrapper";

const CookieManager =
  Platform.OS !== "web" && require("@react-native-cookies/cookies");

export interface User {
  id: number;
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
  birth_date: string;
}
export type userType = "customer" | "cook" | "deliver";

function extractCsrfToken(cookies: string) {
  return cookies
    .split("; ")
    .find((row) => row.startsWith("csrftoken"))
    ?.split("=")[1];
}

export async function getCsrfToken() {
  if (Platform.OS === "web") {
    console.log("Cookies", document.cookie);
    return extractCsrfToken(document.cookie);
  }
  if (process.env.EXPO_PUBLIC_API_URL) {
    let cookies = await CookieManager.get(process.env.EXPO_PUBLIC_API_URL);
    console.log("Cookies", cookies);
    return cookies["csrftoken"].value;
  }
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
  })
    .then((response) => {
      console.log(response);
      return response.json() as Promise<Me>;
    })
    .catch((error) => {
      console.error("Error:", error);
      return Promise.reject(error);
    });
}

export async function login(email: string, password: string) {
  await logout();
  return fetchWrapper("/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
}

export function register(
  user: NewUser | NewCook | NewDeliver,
  type: userType
): Promise<Response> {
  switch (type) {
    case "customer":
      return registerCostumer(user as NewUser);
    case "cook":
      return registerCook(user as NewCook);
    case "deliver":
      return registerDeliver(user as NewDeliver);
  }
}

export function registerCostumer(user: NewUser) {
  return fetchWrapper("/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export function registerCook(user: NewCook) {
  return createCook(user);
}

export function registerDeliver(user: NewDeliver) {
  return createDeliver(user);
}
