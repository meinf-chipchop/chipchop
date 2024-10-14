import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";

import "../global.css"
import { SessionProvider } from "@/auth/ctx";

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded, fontsError] = useFonts({
    "PromptRegular": require("../assets/fonts/Prompt-Regular.ttf"),
    "PromptMedium": require("../assets/fonts/Prompt-Medium.ttf"),
    "PromptSemiBold": require("../assets/fonts/Prompt-SemiBold.ttf"),
    "PromptBold": require("../assets/fonts/Prompt-Bold.ttf"),
    "PromptExtraBold": require("../assets/fonts/Prompt-ExtraBold.ttf"),
    "PromptLight": require("../assets/fonts/Prompt-Light.ttf"),
    "PromptExtraLight": require("../assets/fonts/Prompt-ExtraLight.ttf"),
    "PromptBlack": require("../assets/fonts/Prompt-Black.ttf"),
    "PromptItalic": require("../assets/fonts/Prompt-Italic.ttf"),
  })

  useEffect(() => {
    if (fontsError) throw fontsError;
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, fontsError])

  if (!fontsLoaded && !fontsError) return null

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}

export default RootLayout
