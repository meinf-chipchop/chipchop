import { useState } from "react";
import { ScrollView, View, Image } from "react-native";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { z } from "zod";
import { router } from "expo-router";
import { useStore } from "@/store";

const chefSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  age: z.string().regex(/^\d+$/, "Age must be a number"),
});

const ChefSignUp = () => {
  const { setUserRole } = useStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    age: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      setErrors({});
      chefSchema.parse(form);
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

  const onSendRequestPress = async () => {
    // if (validateForm()) {
    setUserRole("Chef");
    // Proceed with sign up logic
    router.push("/(root)/(tabs)/home" as any);
    // }
  };

  const handleIdImageUpload = () => {};

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
          value={form.email}
          onChangeText={(value: string) => setForm({ ...form, email: value })}
          error={errors.email}
        />
        <InputField
          label="Password"
          placeholder="Password"
          icon={icons.lock}
          secureTextEntry={true}
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
          keyboardType="numeric"
          value={form.phoneNumber}
          onChangeText={(value: string) =>
            setForm({ ...form, phoneNumber: value })
          }
          error={errors.phoneNumber}
        />
        <InputField
          label="Age"
          placeholder="Age"
          icon={icons.person}
          keyboardType="numeric"
          value={form.age}
          onChangeText={(value: string) => setForm({ ...form, age: value })}
          error={errors.age}
        />
        <CustomButton
          IconLeft={() => (
            <Image
              source={icons.id}
              resizeMode="contain"
              className="w-6 h-6 mx-2"
            />
          )}
          title="Upload ID Photo"
          onPress={handleIdImageUpload}
          className="mt-6"
        />
        <CustomButton
          title="Send a Request"
          onPress={onSendRequestPress}
          className="mt-4"
        />
        <OAuth />
      </View>
    </ScrollView>
  );
};
export default ChefSignUp;
