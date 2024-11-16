import DishForm from "@/components/DishForm";
import { View, ScrollView, Text } from "react-native";
import {
  TypeOf,
  ZodObject,
  ZodOptional,
  ZodString,
  ZodNumber,
  ZodDefault,
  ZodBoolean,
  ZodTypeAny,
} from "zod";

const CreateRecipe = () => {
  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 px-6">
        {/* <View className="relative w-full flex justify-center items-center">
          <Image source={images.auth} className="z-0 w-60 h-60" />
        </View> */}
        {/* Title Section */}
        <View className=" bg-primary-700 rounded-3xl mt-6 p-2">
          <Text className="text-3xl py-1 font-bold text-center text-white">
            Create Recipe
          </Text>
        </View>
        <DishForm
          onSubmit={function (
            dish: TypeOf<
              ZodObject<
                {
                  id: ZodOptional<ZodString>;
                  name: ZodString;
                  description: ZodString;
                  category: ZodString;
                  price: ZodNumber;
                  discount: ZodNumber;
                  hidden: ZodDefault<ZodBoolean>;
                },
                "strip",
                ZodTypeAny,
                {
                  name: string;
                  description: string;
                  category: string;
                  price: number;
                  discount: number;
                  hidden: boolean;
                  id?: string | undefined;
                },
                {
                  name: string;
                  description: string;
                  category: string;
                  price: number;
                  discount: number;
                  id?: string | undefined;
                  hidden?: boolean | undefined;
                }
              >
              // eslint-disable-next-line prettier/prettier
            >
          ): Promise<void> {
            throw new Error("Create Function not implemented.");
          }}
        />
      </View>
    </ScrollView>
  );
};

export default CreateRecipe;
