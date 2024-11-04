import { StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useMemo, useState } from 'react'
import BoardingItem from './BoardingItem'
import { onBoardingItems } from '@/constants/Onboarding'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { Button, ButtonText } from './ui/button'
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler'

type SwiperProps = {}

const Swiper = ({}: SwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { height: SCREEN_HEIGHT } = useWindowDimensions()

  const buttonVal = useSharedValue(0)

  const handleGoNext = () => {
    if (currentIndex === onBoardingItems.length - 1) {
      console.log('Last page')
      return
    }

    setCurrentIndex((prev) => prev + 1)
    buttonVal.value = withTiming(currentIndex + SCREEN_HEIGHT)
  }

  const handleGoBack = () => {
    if (currentIndex === 0) {
      console.log('First page')
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
    <View style={styles.container}>
      <GestureDetector gesture={Gesture.Exclusive(onLeftSwipe, onRightSwipe)}>
        <View>
          {onBoardingItems.map((item, index) => {
            return (
              currentIndex === index && <BoardingItem item={item} key={index} />
            )
          })}
        </View>
      </GestureDetector>
      <Button
        className="rounded-full"
        style={styles.button}
        onPress={handleGoNext}
      >
        <ButtonText>Next</ButtonText>
      </Button>
    </View>
  )
}

export default Swiper

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
