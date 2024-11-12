import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="chef-panel" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
