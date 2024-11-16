import { Tabs } from "expo-router";
import { icons } from "@/constants";
import TabIcon from "@/components/TabIcon";

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          shadowColor: "transparent",
          backgroundColor: "#CED1DD",
          borderRadius: 50,
          paddingBottom: 0,
          paddingHorizontal: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 54,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="dishes"
        options={{
          title: "Dishes",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.dish} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.user} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
