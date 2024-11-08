export default function fetchWrapper(
  endpoint: string,
  options: RequestInit
): Promise<Response> {
  return fetch(`${process.env.API_URL}${endpoint}`, options);
}
