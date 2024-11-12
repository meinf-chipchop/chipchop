import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useState } from "react";
// import { useStore } from "./store";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useStore } from "@/store";

const ProfilePage = () => {
  const { user } = useStore();
  // const { user, isChef } = useStore();
  const userDummy = {
    name: "John Doe",
    email: "qYQ0Z@example.com",
    address: "123 Main St, Anytown USA",
    phone: "555-555-5555",
    age: "25",
    yearsOfExperience: "5",
    drivingLicenseNumber: "123456789",
    vehicleType: "Scooter",
  };

  const handleChefPanelPress = () => {
    // Perform logout logic here
    router.push("/(root)/(admins)/chef-panel" as any);
  };

  return (
    <SafeAreaView className="flex flex-col h-full bg-gray-100">
      <View className="items-center mt-8">
        <Image source={icons.profile} className="w-30 h-30 rounded-full" />
        <Text className="text-xl font-bold mt-4">{userDummy.name}</Text>
        <Text className="text-gray-600 mt-2">{userDummy.email}</Text>
      </View>
      <View className="mx-6 mt-8">
        {/* <View className="flex flex-row items-center justify-between">
          <Text className="text-gray-800 font-bold">Password</Text>
          <Text className="text-gray-600">********</Text>
        </View> */}
        <View className="flex flex-row items-center justify-between mt-4">
          <Text className="text-gray-800 font-bold">Address</Text>
          <Text className="text-gray-600">{userDummy.address}</Text>
        </View>
        <View className="flex flex-row items-center justify-between mt-4">
          <Text className="text-gray-800 font-bold">Phone</Text>
          <Text className="text-gray-600">{userDummy.phone}</Text>
        </View>
        {user.role === "Delivery" && (
          <>
            <View className="flex flex-row items-center justify-between mt-4">
              <Text className="text-gray-800 font-bold">
                Years of Driving Experience
              </Text>
              <Text className="text-gray-600">
                {userDummy.yearsOfExperience}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-4">
              <Text className="text-gray-800 font-bold">
                Driving License Number
              </Text>
              <Text className="text-gray-600">
                {userDummy.drivingLicenseNumber}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-4">
              <Text className="text-gray-800 font-bold">Vehicle Type</Text>
              <Text className="text-gray-600">{userDummy.vehicleType}</Text>
            </View>
          </>
        )}
        {(user.role === "Chef" || user.role === "Delivery") && (
          <>
            <View className="flex flex-row items-center justify-between mt-4">
              <Text className="text-gray-800 font-bold">Age</Text>
              <Text className="text-gray-600">{userDummy.age}</Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-4">
              <Text className="text-gray-800 font-bold">ID</Text>
              <Image source={images.id_card} className="rounded" />
            </View>
          </>
        )}
        {user.role === "Chef" && (
          <CustomButton
            title="Chef Panel"
            onPress={handleChefPanelPress}
            className="mt-2"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
