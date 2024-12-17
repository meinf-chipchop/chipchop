import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";

export default function Layout() {
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
