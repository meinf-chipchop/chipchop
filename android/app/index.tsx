import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSession } from '@/auth/authContext';
import { View } from 'react-native';

export default function Index() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {

      if (session) {
        router.push('/(main)'); // Redirect to home if logged in
      } else {
        router.push('/(auth)/'); // Redirect to login if not logged in
      }
    }
  }, [session, isLoading]);

  return (<View></View>);
}
