import DishCard from "@/components/DishCard";
import { Dish, getCookDishes } from "@/lib/dishes";
import { Me, me } from "@/lib/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDishCategories } from "@/lib/dishCategories";
import { useTranslation } from "react-i18next";

const Dishes = () => {
  const { t } = useTranslation();
  const loading = false;
  const [selfUser, setSelfUser] = useState<Me | null>(null);
  const [dishes, setDishes] = useState<Dish[] | null>([]);

  useEffect(() => {
    me().then((user) => setSelfUser(user));
    getDishCategories().then((categories) =>
      console.log("Categories->", categories)
    );
  }, []);

  useEffect(() => {
    if (selfUser)
      getCookDishes(selfUser.id).then((dishes) => setDishes(dishes));
  }, [selfUser]);

  console.log("Dishes->", dishes);
  console.log("Me->", selfUser);

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
                <Text className="text-sm">{t("dish.no_dishes_found")}</Text>
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
