import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="chef/panel" options={{ headerShown: false }} />
      <Stack.Screen name="chef/recipe" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
