import { StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useMemo, useState } from "react";
import { onBoardingItems } from "@/constants/Onboarding";
import { useSharedValue, withTiming } from "react-native-reanimated";
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Stack, router } from "expo-router";
import BoardingItem from "@/components/BoardingItem";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react-native";

const onboarding = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const buttonVal = useSharedValue(0);

  function isLast() {
    return currentIndex === onBoardingItems.length - 1;
  }

  const handleGoNext = () => {
    if (isLast()) {
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    buttonVal.value = withTiming(currentIndex + SCREEN_HEIGHT);
  };

  const handleGoBack = () => {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex((prev) => prev - 1);
    buttonVal.value = withTiming(currentIndex - SCREEN_HEIGHT);
  };

  const onLeftSwipe = useMemo(
    () =>
      Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => handleGoNext()),
    [currentIndex]
  );

  const onRightSwipe = useMemo(
    () =>
      Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => handleGoBack()),
    [currentIndex]
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={Gesture.Exclusive(onLeftSwipe, onRightSwipe)}>
          <View>
            {onBoardingItems.map((item, index) => {
              return (
                currentIndex === index && (
                  <BoardingItem item={item} key={index} />
                )
              );
            })}
          </View>
        </GestureDetector>
        <View className="w-full px-4" style={styles.button}>
          {isLast() ? (
            <Button
              className="rounded-full w-full"
              onPress={() => router.push("/(auth)/")}
            >
              <ButtonText>{t("labels.lets_start")}</ButtonText>
            </Button>
          ) : (
            <Button
              className="rounded-full w-3/6 place-self-end"
              onPress={handleGoNext}
            >
              <ButtonText>{t("labels.next")}</ButtonText>
              <ButtonIcon as={ChevronRight} />
            </Button>
          )}
        </View>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  button: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
  },
});

export default onboarding;

