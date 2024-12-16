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
    user: string;
    street: string;
    city: string
    zip_code: number;
    country_iso2: string;
}
