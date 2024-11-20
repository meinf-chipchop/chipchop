import { Tabs, router, useNavigation } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import { Heading } from "@/components/ui/heading";
import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react-native";
import { Button, ButtonIcon } from "@/components/ui/button";

const TabIcon = ({
  icon,
  focused,
}: {
  icon: React.ReactNode;
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
      {icon}
    </View>
  </View>
);

export default function Layout() {
  const { t } = useTranslation();
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
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon={<Ionicons name="home" color={color} size={size} />}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dishes"
        options={{
          title: "Dishes",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon={<Ionicons name="restaurant" color={color} size={size} />}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          headerTitleAlign: "left",
          headerTitle: ({}) => {
            return <Heading>{t("labels.profile")}</Heading>;
          },
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerRight: () => (
            <Button
              variant="link"
              className="pr-4"
              onPress={() => router.push("/Settings")}
            >
              <ButtonIcon as={Settings} size="xl" />
            </Button>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon={<Ionicons name="person-sharp" color={color} size={size} />}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
