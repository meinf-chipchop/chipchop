import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {};
  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white">
        <View>
          <InputField
            // label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value: any) => setForm({ ...form, email: value })}
          />
          <InputField
            // label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value: any) => setForm({ ...form, password: value })}
          />
          <Text className="text-sm text-right font-JakartaSemiBold text-primary-500 my-2">
            Forgot Password?
          </Text>
          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-2"
          />
          <OAuth />
        </View>
      </View>
    </ScrollView>
  );
};
export default SignIn;
