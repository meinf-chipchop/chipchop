import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";

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
