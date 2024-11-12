import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { z } from "zod";
import { router } from "expo-router";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      setErrors({});
      signInSchema.parse(form);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const onSignInPress = async () => {
    if (validateForm()) {
      // Proceed with sign in logic
      router.push("/(root)/(tabs)/home" as any);
    }
  };

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
            error={errors.email}
          />
          <InputField
            // label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value: any) => setForm({ ...form, password: value })}
            error={errors.password}
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
