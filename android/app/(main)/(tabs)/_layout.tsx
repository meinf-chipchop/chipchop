import { Tabs, useNavigation } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full ${
      focused ? "bg-general-300" : ""
    }`}
  >
    <View
      className={`rounded-full w-fit px-6 h-11 items-center justify-center ${
        focused ? "bg-primary-700" : ""
      }`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-6 h-6"
      />
    </View>
  </View>
);

export default function Layout() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Colors.chestnut[100],
        tabBarInactiveTintColor: Colors.chestnut[900],
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: "#5F544A",
          backgroundColor: Colors.chestnut[500],
          borderRadius: 50,
          paddingBottom: 0, // ios only
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dishes"
        options={{
          title: "Dishes",
          headerShown: false,
          // tabBarButton: () => {
          //   return <Ionicons name="home" />;
          // },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: ({}) => {
            return (
              <Heading className="justify-center">Profile information</Heading>
            );
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="options" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
