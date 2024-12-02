import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the home tab by default
  return <Redirect href="/(root)/(tabs)/home" />;
} 