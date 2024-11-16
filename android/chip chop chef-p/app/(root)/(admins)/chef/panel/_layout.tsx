// import { Stack } from "expo-router";

// const Layout = () => {
//   return (
//     <Stack>
//       <Stack.Screen name="chef-panel" options={{ headerShown: false }} />
//     </Stack>
//   );
// };

// export default Layout;

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
          paddingBottom: 0, // ios only
          paddingHorizontal: 0,
          paddingVertical: 0,
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
        name="chef-panel"
        options={{
          title: "Panel",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.admin} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="new-orders"
        options={{
          title: "New Orders",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.orders} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="accepted-orders"
        options={{
          title: "Accepted Orders",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.accepted_orders} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
