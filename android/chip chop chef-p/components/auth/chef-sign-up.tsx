import { useState } from "react";
import { ScrollView, View, Alert, Dimensions } from "react-native";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { z } from "zod";
import { router } from "expo-router";
import { useStore } from "@/store";
import { register } from "@/lib/auth";
import { createCook } from "@/lib/cook";
import fetchWrapper from "@/lib/fetchWrapper";

const chefSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  publicName: z.string().min(1, "Public name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  age: z.string().min(1, "Age is required").regex(/^\d+$/, "Age must be a number"),
});

const ChefSignUp = () => {
  const { setUserRole } = useStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    publicName: "",
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
    if (validateForm()) {
      try {
        // Ensure age is not empty and convert to a number
        if (!form.age) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            age: "Age is required",
          }));
          return;
        }
        const ageNumber = parseInt(form.age, 10);

        if (isNaN(ageNumber)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            age: "Age must be a valid number",
          }));
          return;
        }

        const birthDate = new Date();
        birthDate.setFullYear(birthDate.getFullYear() - ageNumber);
        const birthDateString = birthDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

        // Register the user
        const newUserResponse = await register({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
          phone: form.phoneNumber,
          age: ageNumber,
        });

        const userData = await newUserResponse.json();
        console.log("Register API Response:", JSON.stringify(userData, null, 2));

        if (userData.email) {
          Alert.alert("Error", userData.email[0]);
          return;
        }

        const userId = userData.user?.id;

        if (!userId) {
          console.error("User ID is undefined. Response:", userData);
          Alert.alert("Error", "Failed to retrieve user ID. Please try again.");
          return;
        }

        const newCookResponse = await createCook({
          public_name: form.publicName,
          user: userId, 
        });

        const cookData = await newCookResponse.json();

        if (!cookData || !cookData.user) {
          console.error("Cook creation failed. Response:", cookData);
          Alert.alert("Error", "Failed to create cook profile. Please try again.");
          return;
        }

        // Send for admin approval
        const approvalResponse = await fetchWrapper("/api/account-approvals/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: 'P',
            role: 'C',  // C for Chef
            user_id: userId,
          }),
        });
        if (approvalResponse.ok) {
          setUserRole("C");
          router.push("/(root)/(tabs)/home");
          Alert.alert("Success", "Your request has been sent for approval.");
        } else {
          console.error("Approval request failed.");
          Alert.alert("Error", "Failed to send approval request. Please try again.");
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        Alert.alert("Error", "Failed to sign up. Please try again.");
      }
    }
  };

  const { width, height } = Dimensions.get('window');

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white mb-10">
        <InputField
          label="First Name"
          placeholder="First name"
          icon={icons.person}
          value={form.firstName}
          onChangeText={(value: string) =>
            setForm({ ...form, firstName: value })
          }
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          placeholder="Last name"
          icon={icons.person}
          value={form.lastName}
          onChangeText={(value: string) =>
            setForm({ ...form, lastName: value })
          }
          error={errors.lastName}
        />
        <InputField
          label="Public Name"
          placeholder="Public name"
          icon={icons.person}
          value={form.publicName}
          onChangeText={(value: string) =>
            setForm({ ...form, publicName: value })
          }
          error={errors.publicName}
        />
        <InputField
          label="Email"
          placeholder="Email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value: string) =>
            setForm({ ...form, email: value })
          }
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
          onChangeText={(value: string) =>
            setForm({ ...form, age: value })
          }
          error={errors.age}
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
