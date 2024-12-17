import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/auth/authContext";

export default function Layout() {
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
