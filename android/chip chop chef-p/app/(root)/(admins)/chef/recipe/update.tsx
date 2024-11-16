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

const UpdateRecipe = () => {
  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 px-6 mt-6">
        {/* Title Section */}
        <View className="mt-1 bg-primary-700 rounded-3xl  p-2">
          <Text className="text-3xl  py-1  font-bold text-center text-white">
            Update Recipe
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
            throw new Error("Update Function not implemented.");
          }}
          dish={{
            id: "1",
            name: "Chicken Parmesan",
            description: "Chicken Parmesan with a creamy tomato sauce",
            category: "Italian",
            price: 25,
            discount: 0,
            hidden: true,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default UpdateRecipe;
