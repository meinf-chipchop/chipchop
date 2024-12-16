import { Platform } from "react-native";

export default function fetchWrapper(
  endpoint: string,
  options: RequestInit
): Promise<Response> {
  if (Platform.OS !== "web")
    console.log("fetchWrapper called from Android", endpoint, options);

  return fetch(`${process.env.EXPO_PUBLIC_API_URL}${endpoint}`, options);
}
