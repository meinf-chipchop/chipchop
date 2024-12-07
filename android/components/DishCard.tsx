import { Dish } from "@/lib/dishes";
import { formatDate } from "@/lib/utils";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

const DishCard = ({ dish }: { dish: Dish }) => {
  return (
    <View className="mb-2 mt-10 relative">
      {/* Large circular dish image */}
      <View className="absolute -top-10 translate-x-1 right-0 z-10">
        <Image
          source={dish.image_url as ImageSourcePropType}
          className="w-32 h-32 rounded-full border-4 border-white"
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

        {dish.created_at ?
          <Text className="text-primary-900 text-right">
            {formatDate(dish.created_at)}
          </Text>
          : null}
      </View>
    </View>
  );
};

export default DishCard;
