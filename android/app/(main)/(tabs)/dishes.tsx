import DishCard from "@/components/DishCard";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const recentDishes: Dish[] = [
  {
    dish_id: "1",
    dish_name: "Chicken Parmesan",
    dish_description: "Chicken Parmesan with a creamy tomato sauce",
    dish_image_url: "",
    dish_price: 25,
    created_at: "2024-10-10 05:19:20.620007",
    chef: {
      chef_id: "2",
      first_name: "David",
      last_name: "Brown",
      profile_image_url:
        "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      rating: "4.60",
    },
  },
  {
    dish_id: "2",
    dish_name: "Chicken Parmesan",
    dish_description: "Chicken Parmesan with a creamy tomato sauce",
    dish_image_url: "",
    dish_price: 25,
    created_at: "2024-10-10 05:19:20.620007",
    chef: {
      chef_id: "1",
      first_name: "James",
      last_name: "Wilson",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      rating: "4.80",
    },
  },
];

const Dishes = () => {
  const loading = false;

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentDishes?.slice(0, 5)}
        renderItem={({ item }) => <DishCard dish={item} />}
        keyExtractor={(_, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                {/* <Image
                  source={images.onboarding1}
                  className="w-40 h-40"
                  alt="No dishes found"
                  resizeMode="contain"
                /> */}
                <Text className="text-sm">No dishes found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Dishes;
