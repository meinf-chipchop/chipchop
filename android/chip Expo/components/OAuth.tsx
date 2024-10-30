import { Image, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <View className="flex flex-row justify-center items-center mt-5 space-x-4">
        <CustomButton
          // title="Log In with Google"
          className="w-12 h-12"
          IconLeft={() => (
            <Image
              source={icons.google}
              resizeMode="contain"
              className="w-6 h-6 mx-2"
            />
          )}
          bgVariant="outline"
          textVariant="primary"
          onPress={handleGoogleSignIn}
        />
        <CustomButton
          // title="Log In with Facebook"
          className="w-12 h-12"
          IconLeft={() => (
            <Image
              source={icons.facebook}
              resizeMode="contain"
              className="w-6 h-6 mx-2"
            />
          )}
          bgVariant="outline"
          textVariant="primary"
          onPress={handleGoogleSignIn}
        />
      </View>
    </View>
  );
};

export default OAuth;
