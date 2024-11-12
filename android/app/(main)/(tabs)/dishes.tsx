import DishCard from "@/components/DishCard";
import { Dish, getCookDishes } from "@/lib/dishes";
import { Me, me } from "@/lib/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dishes = () => {
  const loading = false;
  const [selfUser, setSelfUser] = useState<Me | null>(null);
  const [dishes, setDishes] = useState<Dish[] | null>([]);

  useEffect(() => {
    me().then((user) => setSelfUser(user));
  }, []);

  useEffect(() => {
    if (selfUser)
      getCookDishes(selfUser.id).then((dishes) => setDishes(dishes));
  }, [selfUser]);

  console.log(dishes);
  console.log(selfUser);
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={dishes}
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
