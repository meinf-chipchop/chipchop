import { useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { RadioButton } from "react-native-paper";
import { z } from "zod";
import { router } from "expo-router";
import { useStore } from "@/store";

const deliverySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  drivingExperience: z
    .string()
    .regex(/^\d+$/, "Driving experience must be a number"),
  driverLicense: z.string().optional(),
  driverLicensePhoto: z.string().optional(),
  age: z.string().regex(/^\d+$/, "Age must be a number"),
});

const DeliverySignUp = () => {
  const { setUserRole } = useStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    drivingExperience: "",
    driverLicense: "",
    driverLicensePhoto: "",
    vehicleType: "bicycle",
    age: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      setErrors({});
      deliverySchema.parse(form);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
          console.log(err);
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const onSendRequestPress = async () => {
    if (validateForm()) {
      setUserRole("Delivery");
      // Proceed with sign up logic
      router.push("/(root)/(tabs)/home" as any);
    }
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
        <InputField
          label="Driving Experience"
          placeholder="Years of driving experience"
          icon={icons.yearsOfExperience}
          keyboardType="numeric"
          value={form.drivingExperience}
          onChangeText={(value: string) =>
            setForm({ ...form, drivingExperience: value })
          }
          error={errors.drivingExperience}
        />
        <InputField
          label="Driver License"
          placeholder="Driver license number (if applicable)"
          icon={icons.license}
          value={form.driverLicense}
          onChangeText={(value: string) =>
            setForm({ ...form, driverLicense: value })
          }
          error={errors.driverLicense}
        />
        <Text className="text-lg font-JakartaSemiBold my-2 text-center">
          Vehicle Type
        </Text>
        <View className="bg-neutral-100 rounded-full px-4 py-1">
          <RadioButton.Group
            onValueChange={(value) => setForm({ ...form, vehicleType: value })}
            value={form.vehicleType}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <RadioButton value="bicycle" color="#E7D4B5" />
                <Text>Bicycle</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton value="scooter" color="#E7D4B5" />
                <Text>Scooter</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton value="car" color="#E7D4B5" />
                <Text>Car</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
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
export default DeliverySignUp;
