import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSession } from "@/auth/authContext";
import { View } from "react-native";
import { me } from "@/lib/auth";

export default function Index() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  // Check if me works, if error go to auth page
  useEffect(() => {
    me()
      .then((user) => {
        console.log("User->", user);
        console.log("Redirecting to home, user is logged in");
        router?.push("/(main)/(tabs)/home");
      })
      .catch(() => router?.push("/(auth)/signin"));
  }, [router]);

  return <View></View>;
}
