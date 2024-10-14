import { useSession } from "@/auth/ctx";
import { useState } from "react";
import { View, Text, Button, Linking } from "react-native";
import StyledInput from "@/components/StyledInput";
import { useRouter } from "expo-router";

export default function SignIn() {
  const router = useRouter()
  const { isLoading, signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoading)
    return (<View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-prmtbold">Loading...</Text>
    </View>);

  return (
    <View className="flex-1 items-center justify-center bg-white gap-4">
      <Text className="text-3xl font-prmtbold ">Sign In</Text>
      <StyledInput placeholder="Email" value={email} handleChangeText={(input) => setEmail(input)} />
      <StyledInput placeholder="Password" isPassword={true} value={password} handleChangeText={(input) => setPassword(input)} />
      <Button title="Sign In" onPress={() => signIn(email, password, () => router.push('/'))} />
      <Text className="text-base">Don't have an account?</Text>
      <Text className="text-base text-blue-500" onPress={() => router.push('/sign-up')}>Register</Text>
    </View>
  );
} 
