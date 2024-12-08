import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";

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
    <CartProvider>
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
    </CartProvider>
  );
}
