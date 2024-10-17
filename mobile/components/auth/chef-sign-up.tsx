import { useState } from "react";
import { ScrollView, View, Image } from "react-native";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

const ChefSignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    age: "",
  });

  const onSendRequestPress = async () => {};

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
        />
        <InputField
          label="Email"
          placeholder="Email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value: string) => setForm({ ...form, email: value })}
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
          keyboardType="numeric"
          value={form.phoneNumber}
          onChangeText={(value: string) =>
            setForm({ ...form, phoneNumber: value })
          }
        />
        <InputField
          label="Age"
          placeholder="Age"
          icon={icons.person}
          keyboardType="numeric"
          value={form.age}
          onChangeText={(value: string) => setForm({ ...form, age: value })}
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
