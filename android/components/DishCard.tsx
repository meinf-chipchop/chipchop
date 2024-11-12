import { Dish } from "@/lib/dishes";
import { View, Image, Text } from "react-native";

export default function DishCard({ dish }: { dish: Dish }) {
  return (
    <View className="rounded-xl overflow-hidden shadow-md">
      <Image
        source={{ uri: dish.image_url }}
        style={{ width: "100%", aspectRatio: 16 / 9 }}
      />
      <View className=" shadow py-1">
        <Text className="font-bold text-lg ms-3">{dish.name}</Text>
      </View>
      <View className="bg-[#d6b48b] p-3 relative">
        <Text>{dish.description}</Text>
        <Text className="absolute right-4 top-2 bg-black text-white rounded-md p-1">
          {dish.price}€
        </Text>
      </View>
    </View>
  );
}
