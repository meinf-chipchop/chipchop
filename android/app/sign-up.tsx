import { useSession } from "@/auth/ctx";
import { useState } from "react";
import { View, Text, Button } from "react-native";
import StyledInput from "@/components/StyledInput";

export default function SignUp() {
  const { signUp } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 items-center justify-center bg-white gap-4">
      <Text className="text-3xl font-prmtbold ">Sign Up</Text>
      <StyledInput placeholder="Email" value={email} handleChangeText={(input) => setEmail(input)} />
      <StyledInput placeholder="Password" isPassword={true} value={password} handleChangeText={(input) => setPassword(input)} />
      <StyledInput placeholder="Repeat Password" isPassword={true} value={password} handleChangeText={(input) => setPassword(input)} />
      <Button title="Register" onPress={() => signUp(email, password)} />
    </View>
  );
} 
