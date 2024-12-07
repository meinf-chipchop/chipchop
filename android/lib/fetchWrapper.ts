export default function fetchWrapper(
  endpoint: string,
  options: RequestInit
): Promise<Response> {
  return fetch(`${process.env.EXPO_PUBLIC_API_URL}${endpoint}`, options);
}
