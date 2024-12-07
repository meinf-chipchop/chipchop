import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Images } from "@/constants/Images";
import SignIn from "./signin";
import { useTranslation } from "react-i18next";
import SignUp from "./register/SignUp";

const AuthForms = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 px-6">
        <View className="relative w-screen flex justify-center items-center">
          <Image
            style={{ width: 600, height: 200 }}
            contentFit="contain"
            source={Images.auth}
          />
          <View className="flex-row justify-center w-full mb-4">
            <TouchableOpacity
              className={`px-4 py-2 ${activeTab === "login" ? "border-b-2 border-primary-500" : ""
                }`}
              onPress={() => {
                setActiveTab("login");
              }}
            >
              <Text
                className={`text-lg font-JakartaSemiBold ${activeTab === "login" ? "text-primary-500" : "text-black"
                  }`}
              >
                {t("auth.log_in")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 ${activeTab === "signup" ? "border-b-2 border-primary-500" : ""
                }`}
              onPress={() => {
                setActiveTab("signup");
              }}
            >
              <Text
                className={`text-lg font-JakartaSemiBold ${activeTab === "signup" ? "text-primary-500" : "text-black"
                  }`}
              >
                {t("auth.sign_up")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {activeTab === "signup" ? <SignUp /> : <SignIn />}
      </View>
    </ScrollView>
  );
};

export default AuthForms;
