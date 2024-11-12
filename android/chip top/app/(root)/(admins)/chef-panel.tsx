import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import DishCard from "@/components/DishCard";
import { dishes } from "@/constants";
import { Dish } from "@/types/type";

const allDishes: Dish[] = [
  {
    dish_id: "1",
    dish_name: "Chicken Parmesan",
    dish_description: "Chicken Parmesan with a creamy tomato sauce",
    dish_image_url: dishes.dish2,
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
    dish_image_url: dishes.dish2,
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
  {
    dish_id: "3",
    dish_name: "Chicken Parmesan",
    dish_description: "Chicken Parmesan with a creamy tomato sauce",
    dish_image_url: dishes.dish2,
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

const ChefPanel = () => {
  const [dishes] = useState(allDishes);
  const [loading] = useState(false);

  const handleCreateDish = () => {
    // Add logic to create a new dish
    // console.log('Creating a new dish...');
  };

  const handleEditDish = () => {
    // Add logic to edit a dish
    // console.log('Editing a dish...');
  };

  const handleDeleteDish = () => {
    // Add logic to delete a dish
    // console.log('Deleting a dish...');
  };

  return (
    <SafeAreaView className="flex flex-col h-full bg-gray-100">
      {/* Create Dish Section */}
      <SafeAreaView className="px-4">
        <CustomButton title="Create Dish" onPress={handleCreateDish} />
      </SafeAreaView>

      {/* Dish List Section */}
      <SafeAreaView className="flex-1">
        <FlatList
          data={dishes?.slice(0, 5)}
          // renderItem={({ item }) => <DishCard dish={item} />}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg shadow-md px-4 py-3 my-2">
              <DishCard dish={item} />
              <View className="flex flex-row justify-end space-x-2 mt-2">
                <CustomButton
                  title="Edit"
                  onPress={() => handleEditDish()}
                  className="w-20"
                />
                <CustomButton
                  title="Delete"
                  onPress={() => handleDeleteDish()}
                  className="w-20"
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          className="px-5"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListEmptyComponent={() => (
            <View className="flex flex-col items-center justify-center">
              {!loading ? (
                <>
                  <Text className="text-sm">No dishes found</Text>
                </>
              ) : (
                <ActivityIndicator size="small" color="#000" />
              )}
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ChefPanel;
