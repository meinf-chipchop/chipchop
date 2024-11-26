import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/auth/authContext";

export default function Layout() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        router.push("/(main)/(tabs)/home"); // Redirect to home if logged in
      } else {
        router.push("/(auth)/onboarding"); // Redirect to login if not logged in
      }
    }
  }, [session, isLoading]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.chestnut[50],
        },
        headerTintColor: Colors.chestnut[400],
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  );
}
