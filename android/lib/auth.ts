import fetchWrapper from "./fetchWrapper";

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
