import { useState } from "react";
import { ScrollView, Text, View, Image, Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { RadioButton } from "react-native-paper";
import { z } from "zod";
import { router } from "expo-router";
import { useStore } from "@/store";
import { createDeliverer, TransportEnum, NewDeliverer } from "@/lib/del";
import fetchWrapper from "@/lib/fetchWrapper";

const deliverySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  vehicleType: z.nativeEnum(TransportEnum),
  age: z.number().min(18, "You must be at least 18 years old"),
});

const DeliverySignUp = () => {
  const { setUserRole } = useStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    vehicleType: TransportEnum.BICYCLE,
    age: 18,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      setErrors({});
      const parsedForm = {...form, age: parseInt(form.age.toString())};
      deliverySchema.parse(parsedForm);
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
    if (validateForm()) {
      setUserRole("D");
      try {
        // Prepare data
        const delivererData: NewDeliverer = {
          transport: form.vehicleType,
          user: {
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            password: form.password,
            phone: form.phoneNumber,
            age: form.age,
          },
        };

        // Create the deliverer
        const delivererResponse = await createDeliverer(delivererData);
        const delivererResult = await delivererResponse.json();

        if (!delivererResponse.ok || !delivererResult.user?.id) {
          console.error("Failed to create deliverer. Response:", delivererResult);
          Alert.alert("Error", delivererResult.user?.email?.[0] || "Failed to create deliverer. Please try again.");
          return;
        }

        const userId = delivererResult.user.id;

        // Send for admin approval
        await fetchWrapper("/api/account-approvals/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            state: 'P',  // Pending
            role: 'D',   // Delivery
            transport: form.vehicleType,
          }),
        });

        router.push("/(root)/(tabs)/home");
        Alert.alert("Success", "Your request has been sent for approval.");
      } catch (error) {
        console.error("Error during sign up:", error);
        Alert.alert("Error", "Failed to sign up. Please try again.");
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white mb-10">
        <InputField
          label="First Name"
          placeholder="First name"
          icon={icons.person}
          value={form.firstName}
          onChangeText={(value: string) => setForm({ ...form, firstName: value })}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          placeholder="Last name"
          icon={icons.person}
          value={form.lastName}
          onChangeText={(value: string) => setForm({ ...form, lastName: value })}
          error={errors.lastName}
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
          onChangeText={(value: string) => setForm({ ...form, password: value })}
          error={errors.password}
        />
        <InputField
          label="Phone Number"
          placeholder="Phone number"
          icon={icons.phone}
          keyboardType="numeric"
          value={form.phoneNumber}
          onChangeText={(value: string) => setForm({ ...form, phoneNumber: value })}
          error={errors.phoneNumber}
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
          label="Age"
          placeholder="Age"
          icon={icons.person}
          keyboardType="numeric"
          value={form.age.toString()}
          onChangeText={(value: string) => setForm({ ...form, age: parseInt(value) })}
          error={errors.age}
        />
        <Text className="text-lg font-semibold mt-4 mb-2">
          Vehicle Type
        </Text>
        <RadioButton.Group
          onValueChange={(value) => setForm({ ...form, vehicleType: value as TransportEnum })}
          value={form.vehicleType}
        >
          <View className="flex-row justify-between px-4">
            <RadioButton.Item label="Bicycle" value={TransportEnum.BICYCLE} />
            <RadioButton.Item label="Scooter" value={TransportEnum.SCOOTER} />
            <RadioButton.Item label="Car" value={TransportEnum.CAR} />
          </View>
        </RadioButton.Group>
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
