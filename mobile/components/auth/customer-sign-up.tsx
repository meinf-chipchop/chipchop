import { useState } from "react";
import { ScrollView, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

const CustomerSignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const onSignUpPress = async () => {};
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
        />
        <InputField
          label="Email"
          placeholder="Email"
          icon={icons.email}
          textContentType="emailAddress"
          value={form.email}
          onChangeText={(value: string) => setForm({ ...form, email: value })}
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
        />
        <InputField
          label="Address"
          placeholder="Address"
          icon={icons.location}
          value={form.address}
          onChangeText={(value: string) => setForm({ ...form, address: value })}
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
