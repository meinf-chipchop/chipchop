import DishCard from "@/components/DishCard";
import { Dish, getCookDishes } from "@/lib/dishes";
import { Me, me } from "@/lib/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDishCategories } from "@/lib/dishCategories";
import { useTranslation } from "react-i18next";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { CookingPot } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Center } from "@/components/ui/center";

const Dishes = () => {
  const router = useRouter();
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
    <SafeAreaView className="bg-general-500 flex-1">
      {dishes && dishes.length > 0 && (
        <Button
          className="mx-2 my-5"
          variant="outline"
          onPress={() => {
            router.push("/DishForm");
          }}
        >
          <ButtonText>{t("dish.create")}</ButtonText>
        </Button>
      )}
      <FlatList
        data={dishes}
        renderItem={({ item }) => <DishCard dish={item} />}
        keyExtractor={(_, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View className="flex-1 flex-grow w-full items-center justify-center">
            {!loading ? (
              <VStack className="justify-items-center" space="xl">
                <Center>
                  <CookingPot size={128} color={Colors.chestnut[700]} />
                  <Text className="text-lg color-primary-500 py-10">
                    {t("dish.no_dishes_found") + "  😔"}
                  </Text>
                  <Button
                    variant="outline"
                    onPress={() => {
                      router.push("/DishForm");
                    }}
                  >
                    <ButtonText>{t("dish.create")}</ButtonText>
                  </Button>
                </Center>
              </VStack>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        }
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default Dishes;
