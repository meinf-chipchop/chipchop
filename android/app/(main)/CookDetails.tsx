
import { CookDetailed, getCookByURL } from "@/lib/cook";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Dish, getCookDishes } from "@/lib/dishes";
import { CookProfileDishCard, CookProfileExpandableDishCard } from "@/components/CookProfileDishCard";
import RatingCard from "@/components/RatingCard";
import { ScrollView, View, Text } from "react-native";
import { useTranslation } from "react-i18next";


function CookDetails() {
    var { cook_url } = useLocalSearchParams();

    const [cook, setCook] = useState<CookDetailed>();
    const [dishes, setDishes] = useState<Dish[]>();
    const [topDish, setTopDish] = useState<Dish>();

    const { t } = useTranslation();

    useEffect(() => {
        const url = `${cook_url}`;
        getCookByURL(url).then((cook) => setCook(cook)).catch((error) => console.error(error));
    }, [cook_url]);

    useEffect(() => {
        if (!cook || !cook.user) return;
        getCookDishes(Number(cook.user.id)).then((dishes) => {
            setDishes(dishes.sort((a, b) => Number(b.rating_average) - Number(a.rating_average)).slice(1, dishes.length));
            setTopDish(dishes[0]);
        }).catch((error) => console.error(error));
    }, [cook])


    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: cook?.public_name ?? t("labels.loading"),
                    headerLeft: () => (
                        <Button
                            className="pl-4"
                            variant="link"
                            onPress={() => router.back()}
                        >
                            <ButtonIcon as={ChevronLeftIcon} size="md" />
                        </Button>
                    ),
                    headerRight: () => <View className="w-auto items-center align-center mx-4">
                        {cook && cook.rating_count > 0 && <RatingCard rating_average={cook.rating_average} rating_count={null}></RatingCard>}
                    </View>
                }}
            />

            <ScrollView>
                <View className="align-center items-center">
                    <Text className="underline font-bold text-xl w-auto mt-4 mb-2">{t('dish.top_rated')}</Text>
                </View>
                <View className="flex flex-col">
                    {topDish && <View className="my-2 w-screen shadow-xl">
                        <CookProfileDishCard key={`top-rated-dish`} dish={topDish} />
                    </View>}
                    <View className="bg-grey-200 w-full items-center align-center text-md">
                        <Text className="w-auto underline p-2">{t('dish.all')}</Text>
                        <View className="flex flex-col gap-y-2 w-auto">

                            {dishes?.map((dish, index) => (
                                <CookProfileExpandableDishCard key={index} dish={dish} />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default CookDetails;