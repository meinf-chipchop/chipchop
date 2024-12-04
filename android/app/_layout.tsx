import FontAwesome from "@expo/vector-icons/FontAwesome";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SessionProvider } from "@/auth/authContext";
import "@/i18n";
import { initI18n } from "@/i18n";
import { initOneSignal } from "@/lib/onesignal/main";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Jakarta: require("../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf"),
    JakartaItalic: require("../assets/fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf"),
    ...FontAwesome.font,
  });

  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  useEffect(() => {
    const initializeI18N = async () => {
      await initI18n();
      setIsI18nInitialized(true);
    };
    initializeI18N();
    initOneSignal();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isI18nInitialized) {
      SplashScreen.hideAsync();
      console.log("SplashScreen.hideAsync()");
    }
  }, [loaded, isI18nInitialized]);

  if (!loaded || !isI18nInitialized) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </GluestackUIProvider>
  );
}
