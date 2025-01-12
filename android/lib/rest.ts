import { getCsrfToken } from "./auth";

export interface BaseHyperlinkedModel {
    url: string;
}

export interface BaseIdentifiedModel {
    id: number;
}

export interface GenericPaging<T> {
    count: number;
    next?: string;
    previous?: string;
    results: Array<T>;
};

export interface UrlPaging extends GenericPaging<BaseHyperlinkedModel> { }

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function nginxUrl(url: string): string {
    if (!url.startsWith('http')) {
        return `${process.env.EXPO_PUBLIC_API_URL}${url}`;
    }
    return url;
}

export async function request<T>(url: string, method: HttpMethod, body?: any): Promise<T> {
    return fetch(nginxUrl(url), {
        method,
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': await getCsrfToken() ?? "",
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json() as T;
    });
}

export async function requestResponse(url: string, method: HttpMethod, body?: any): Promise<Response> {
    return fetch(nginxUrl(url), {
        method,
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': await getCsrfToken() ?? "",
        }
    });
}

export function get<T>(url: string): Promise<T> {
    return request(url, 'GET');
}

export async function getDetailed<T extends BaseHyperlinkedModel, R>(url: string): Promise<Array<R>> {
    const result = get<GenericPaging<T>>(url);
    return result.then((res) => Promise.all(res.results.map((item) => get<R>(item.url))));
}

export function post<T>(url: string, body: any): Promise<T> {
    return request<T>(url, 'POST', body);
}

export function put<T>(url: string, body: any): Promise<T> {
    return request<T>(url, 'PUT', body);
}

export function patch<T>(url: string, body: any): Promise<T> {
    return request<T>(url, 'PATCH', body);
}