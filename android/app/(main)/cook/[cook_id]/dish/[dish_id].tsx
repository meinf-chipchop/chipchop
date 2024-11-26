import NotFoundScreen from "@/app/+not-found";
import { Button, ButtonIcon } from "@/components/ui/button";
import { me, Me } from "@/lib/auth";
import { Dish, getDish } from "@/lib/dishes";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import { ChevronLeftIcon } from "lucide-react-native";
import { useEffect, useState } from "react";

export default function DetailsScreen() {
  const { dish_id, cook_id } = useLocalSearchParams();

  const [selfUser, setSelfUser] = useState<Me | null>(null);
  const [dish, setDish] = useState<Dish | null>(null);

  useEffect(() => {
    if (!dish_id || !cook_id) return;

    // Fetch dish
    getDish(Number(cook_id), Number(dish_id))
      .then((dish) => {
        setDish(dish);
      })
      .catch((error) => {
        // Redirect to notfound
        NotFoundScreen();
      });
  }, [dish_id]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: dish?.name ?? t("labels.loading"),
          headerLeft: () => (
            <Button
              className="pl-4"
              variant="link"
              onPress={() => router.back()}
            >
              <ButtonIcon as={ChevronLeftIcon} size="md" />
            </Button>
          ),
        }}
      />
    </>
  );
}
