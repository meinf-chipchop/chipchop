import { useState } from "react";
import { ScrollView, View } from "react-native";
import { z } from "zod";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { router } from "expo-router";

const customerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
});

const CustomerSignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      setErrors({});
      customerSchema.parse(form);
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

  const onSignUpPress = async () => {
    if (validateForm()) {
      // Proceed with sign up logic
      router.push("/(root)/(tabs)/home" as any);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white mb-10">
        <InputField
          label="Full Name"
          placeholder="Full name"
          icon={icons.person}
          value={form.fullName}
          onChangeText={(value: string) =>
            setForm({ ...form, fullName: value })
          }
          error={errors.fullName}
        />
        <InputField
          label="Email"
          placeholder="Email"
          icon={icons.email}
          textContentType="emailAddress"
          value={form.email}
          onChangeText={(value: string) => setForm({ ...form, email: value })}
          error={errors.email}
        />
        <InputField
          label="Password"
          placeholder="Password"
          icon={icons.lock}
          secureTextEntry={true}
          textContentType="password"
          value={form.password}
          onChangeText={(value: string) =>
            setForm({ ...form, password: value })
          }
          error={errors.password}
        />
        <InputField
          label="Address"
          placeholder="Address"
          icon={icons.location}
          value={form.address}
          onChangeText={(value: string) => setForm({ ...form, address: value })}
          error={errors.address}
        />
        <InputField
          label="Phone Number"
          placeholder="Phone number"
          icon={icons.phone}
          textContentType="telephoneNumber"
          value={form.phoneNumber}
          onChangeText={(value: string) =>
            setForm({ ...form, phoneNumber: value })
          }
          error={errors.phoneNumber}
        />
        <CustomButton
          title="Sign Up"
          onPress={onSignUpPress}
          className="mt-6"
        />
        <OAuth />
      </View>
    </ScrollView>
  );
};

export default CustomerSignUp;
