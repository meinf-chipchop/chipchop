import { Dish } from "@/lib/dishes";
import { formatDate } from "@/lib/utils";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

const DishCard = ({ dish }: { dish: Dish }) => {
  let imageSrc: ImageSourcePropType = dish?.image_url as ImageSourcePropType;
  if (dish?.image_url === null) {
    imageSrc = require("../assets/images/no-dish-image.png");
  }

  return (
    <Pressable
      onPress={() => {
        router.push(`/cook/${dish.user_id}/dish/${dish.id}`);
      }}
    >
      <View className="mb-2 mt-10 relative drop-shadow-lg">
        {/* Large circular dish image */}
        <View className="absolute -top-10 translate-x-1 right-0 z-10">
          <Image
            source={imageSrc}
            className="w-32 h-32 rounded-full border-4 border-white bg-gray-200"
          />
        </View>

        {/* Card content */}
        <View className="bg-primary-500 rounded-3xl shadow-sm shadow-neutral-300 pt-2 pb-4 px-2">
          <View className="w-[70%]">
            <Text className="font-bold text-white text-xl mb-2 bg-primary-700 p-2 w-fit rounded-full">
              {dish.name}
            </Text>
            <Text className="mb-4 font-semibold text-primary-900">
              {dish.description}
            </Text>
          </View>

          <View className="flex flex-row mb-4 justify-end w-full">
            <View className="bg-white px-4 py-2 rounded-full ">
              <Text className="font-extrabold text-lg text-primary-900">
                ${dish.price}
              </Text>
            </View>
          </View>

          <Text className="text-primary-900 text-right">
            {formatDate(dish.created_at ?? "")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default DishCard;
