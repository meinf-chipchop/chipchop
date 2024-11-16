import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { formatDate } from "@/lib/utils";
import { cooks } from "@/constants";

const DishCard = ({ dish }: { dish: Dish }) => {
  const user_uuid = dish.user_uuid;
  const cook = cooks.find((cook) => cook.uuid === user_uuid);
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

        <View className="flex flex-row items-center justify-between mb-4">
          {cook && (
            <View className="flex flex-row items-center bg-primary-700 px-3 py-2 rounded-full">
              <Image
                source={{ uri: cook.image_url }}
                className="w-10 h-10 rounded-full mr-2"
              />
              <View>
                <Text className="font-bold text-white ">{`${cook.name}`}</Text>
                <Text className="text-primary-500 font-bold">{cook.role}</Text>
                {/* <View className="flex flex-row items-center">
                <Image
                  source={icons.star}
                  className="w-4 h-4 mr-1"
                  tintColor="#E7D4B5"
                />
                <Text className="text-primary-900 font-bold">
                  {dish.chef.rating}
                </Text>
              </View> */}
              </View>
            </View>
          )}
          <View className="bg-white px-4 py-2 rounded-full">
            <Text className="font-extrabold text-lg text-primary-900">
              ${dish.price.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text className="text-primary-900 text-right">
          {formatDate(dish.created_at)}
        </Text>
      </View>
    </View>
  );
};

export default DishCard;
