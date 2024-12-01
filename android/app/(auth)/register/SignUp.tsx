import { Pressable, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Center } from "@/components/ui/center";
import { Bike, ChefHat, User } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import CustomerSignUp from "./CookSignUp";
import CookSignUp from "./CookSignUp";
import DeliverySignUp from "./DeliverySignUp";

type SignUpType = "customer" | "chef" | "delivery";

const SignUp = () => {
  const { t } = useTranslation();
  const iconColor = "#FFF";
  const [signUpType, setSignUpType] = useState<SignUpType | null>(null);

  const renderSignUpForm = () => {
    switch (signUpType) {
      case "customer":
        return <CustomerSignUp />;
      case "chef":
        return <CookSignUp />;
      case "delivery":
        return <DeliverySignUp />;
      default:
        return null;
    }
  };

  return (
    <>
      {!signUpType ? (
        <VStack space="md">
          <Heading className="mb-4">{t("auth.register_as")}</Heading>
          <Pressable
            className="p-4 bg-primary-400 border-2 border-primary-400 rounded-xl"
            onPress={() => setSignUpType("customer")}
          >
            <Center>
              <User size={48} color={iconColor} />
              <Text className="mt-2 color-white">Customer</Text>
            </Center>
          </Pressable>
          <Pressable
            className="p-4 bg-primary-400 border-2 border-primary-400 rounded-xl"
            onPress={() => setSignUpType("chef")}
          >
            <Center>
              <ChefHat size={48} color={iconColor} />
              <Text className="mt-2 color-white">{t("labels.chef")}</Text>
            </Center>
          </Pressable>
          <Pressable
            className="p-4 bg-primary-400 border-2 border-primary-400 rounded-xl"
            onPress={() => setSignUpType("delivery")}
          >
            <Center>
              <Bike size={48} color={iconColor} />
              <Text className="mt-2 color-white">{t("labels.deliver")}</Text>
            </Center>
          </Pressable>
        </VStack>
      ) : (
        renderSignUpForm()
      )}
    </>
  );
};

export default SignUp;
