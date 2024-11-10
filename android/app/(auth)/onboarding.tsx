import { StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useMemo, useState } from 'react'
import { onBoardingItems } from '@/constants/Onboarding'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { router } from 'expo-router'
import BoardingItem from '@/components/BoardingItem'
import { Button, ButtonText } from '@/components/ui/button'

const onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { height: SCREEN_HEIGHT } = useWindowDimensions()

  const buttonVal = useSharedValue(0)

  function isLast() {
    return currentIndex === onBoardingItems.length - 1
  }

  const handleGoNext = () => {
    if (isLast()) {
      return
    }

    setCurrentIndex((prev) => prev + 1)
    buttonVal.value = withTiming(currentIndex + SCREEN_HEIGHT)
  }

  const handleGoBack = () => {
    if (currentIndex === 0) {
      return
    }

    setCurrentIndex((prev) => prev - 1)
    buttonVal.value = withTiming(currentIndex - SCREEN_HEIGHT)
  }

  const onLeftSwipe = useMemo(
    () =>
      Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => handleGoNext()),
    [currentIndex]
  )

  const onRightSwipe = useMemo(
    () =>
      Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => handleGoBack()),
    [currentIndex]
  )

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={Gesture.Exclusive(onLeftSwipe, onRightSwipe)}>
        <View>
          {onBoardingItems.map((item, index) => {
            return (
              currentIndex === index && <BoardingItem item={item} key={index} />
            )
          })}
        </View>
      </GestureDetector>
      {isLast() ? (
        <Button
          className="rounded-full bg-secondary-400"
          style={styles.button}
          onPress={() => router.push('/(auth)/')}
        >
          <ButtonText>Sign up</ButtonText>
        </Button>
      ) : (
        <Button
          className="rounded-full"
          style={styles.button}
          onPress={handleGoNext}
        >
          <ButtonText>Next</ButtonText>
        </Button>
      )}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  button: {
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
  },
})

export default onboarding
