import { me } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();
  // Check if me works, if error go to auth page
  useEffect(() => {
    if (!router) return;

    me()
      .then((user) => {
        console.log("User->", user);
        console.log("Redirecting to home, user is logged in");
        router?.push("/(main)/(tabs)/home");
      })
      .catch(() => router?.push("/(auth)"));
  }, [router]);
  return <View></View>;
}
