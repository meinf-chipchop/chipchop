import DishCard from "@/components/DishCard";
import { allDishes } from "@/constants";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dishes = () => {
  const loading = false;

  return (
    <SafeAreaView className="flex gap-4 px-2 flex-col h-full bg-gray-100">
      {/* Title Section */}
      <View className=" bg-general-100 rounded-sm p-2">
        <Text className="text-2xl py-1 font-bold text-center text-white">
          Recipes
        </Text>
      </View>
      <FlatList
        data={allDishes?.slice(0, 5)}
        renderItem={({ item }) => <DishCard dish={item} />}
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
                {/* <Image
                  source={images.onboarding1}
                  className="w-40 h-40"
                  alt="No dishes found"
                  resizeMode="contain"
                /> */}
                <Text className="text-sm rounded-full  p-4 bg-primary-800 text-white">
                  No Recipe found
                </Text>
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
