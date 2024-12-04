import { Platform } from "react-native";
import { LogLevel, OneSignal } from "react-native-onesignal";

// Add OneSignal within your App's root component
export function initOneSignal() {
  const apiKey = process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID;

  if (!apiKey) {
    console.log("OneSignal: API key not found");
    return;
  }

  if (Platform.OS === "web") {
    console.log("OneSignal: Skipping initialization on web");
    return;
  }

  console.log("OneSignal: Initializing with API key", apiKey);

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize(apiKey);

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener("click", (event) => {
    console.log("OneSignal: notification clicked:", event);
  });
}
