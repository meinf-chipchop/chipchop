import { get } from "./rest";

export interface UserDetail {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "U" | "C" | "D";
  phone: string;
  birth_date: string | undefined;
  banned: boolean;
}

export interface Address {
  url?: string;
  user: string;
  street: string;
  city: string;
  zip_code: number;
  country_iso2: string;
}

interface AddressList {
  count: number;
  next: Address;
  previous: Address;
  results: Address[];
}

export async function getAddresses(): Promise<Address[]> {
  try {
    const addressList = await get<AddressList>("/api/adresses/");
    return addressList.results;
  } catch (e) {
    return [];
  }
}

export function formatAddress(address: Address | undefined): string {
  return address
    ? `${address.street}, ${address.city}, ${
        address.zip_code
      }, ${address.country_iso2.toUpperCase()}`
    : "";
}
