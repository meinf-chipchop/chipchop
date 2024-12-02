import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#E7D4B5" : "#898989",
              }}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#E7D4B5" : "#898989",
              }}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      {/* Add other tab screens here */}
    </Tabs>
  );
}
