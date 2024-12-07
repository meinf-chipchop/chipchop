import { NewUser } from "./auth";
import fetchWrapper from "./fetchWrapper";

export interface NewDeliver {
  vehicle: Vehicle;
  user: NewUser;
}

export type Vehicle = "B" | "S" | "C" | null;

export function createDeliver(deliver: NewDeliver) {
  return fetchWrapper("/api/deliverers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deliver),
  });
}
