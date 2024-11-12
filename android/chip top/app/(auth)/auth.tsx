import ChefSignUp from "@/components/auth/chef-sign-up";
import CustomerSignUp from "@/components/auth/customer-sign-up";
import DeliverySignUp from "@/components/auth/delivery-sign-up";
import SignIn from "@/components/auth/sign-in";
import CustomButton from "@/components/CustomButton";
import { icons, images } from "@/constants";
import { useState } from "react";
import { Text, Image, View, ScrollView, TouchableOpacity } from "react-native";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [signUpType, setSignUpType] = useState("");

  const renderSignUpComponent = () => {
    switch (signUpType) {
      case "customer":
        return <CustomerSignUp />;
      case "chef":
        return <ChefSignUp />;
      case "delivery":
        return <DeliverySignUp />;
      default:
        return (
          <View className="pt-6">
            <CustomButton
              title="Customer"
              className="mb-4"
              IconLeft={() => (
                <Image
                  source={icons.user}
                  alt="User icon"
                  resizeMode="contain"
                  className="w-4 h-4 mx-2"
                />
              )}
              onPress={() => setSignUpType("customer")}
            />
            <CustomButton
              title="Chef"
              className="mb-4"
              IconLeft={() => (
                <Image
                  source={icons.chef}
                  alt="Chef icon"
                  resizeMode="contain"
                  className="w-4 h-4 mx-2"
                />
              )}
              onPress={() => setSignUpType("chef")}
            />
            <CustomButton
              title="Delivery"
              IconLeft={() => (
                <Image
                  source={icons.delivery}
                  alt="Delivery icon"
                  resizeMode="contain"
                  className="w-4 h-4 mx-2"
                />
              )}
              onPress={() => setSignUpType("delivery")}
            />
          </View>
        );
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 px-6">
        <View className="relative w-full flex justify-center items-center">
          <Image source={images.auth} className="z-0 w-60 h-60" />
          <View className="flex-row justify-center w-full mb-4">
            <TouchableOpacity
              className={`px-4 py-2 ${activeTab === "login" ? "border-b-2 border-primary-500" : ""}`}
              onPress={() => {
                setActiveTab("login");
                setSignUpType("");
              }}
            >
              <Text
                className={`text-lg font-JakartaSemiBold ${activeTab === "login" ? "text-primary-500" : "text-black"}`}
              >
                Log In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 ${activeTab === "signup" ? "border-b-2 border-primary-500" : ""}`}
              onPress={() => {
                setActiveTab("signup");
                setSignUpType("");
              }}
            >
              <Text
                className={`text-lg font-JakartaSemiBold ${activeTab === "signup" ? "text-primary-500" : "text-black"}`}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {activeTab === "signup" ? renderSignUpComponent() : <SignIn />}
      </View>
    </ScrollView>
  );
};

export default Auth;
