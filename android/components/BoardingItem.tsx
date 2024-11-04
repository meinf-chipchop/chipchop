import {
  StyleSheet,
  Text,
  Image,
  View,
  useWindowDimensions,
} from 'react-native'
import React from 'react'
import { OnboardingItem } from '@/constants/Onboarding'
import { Colors } from '@/constants/Colors'

type BoardingItemProps = {
  item: OnboardingItem
}

const BoardingItem = ({ item }: BoardingItemProps) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions()

  return (
    <View
      style={[
        styles.itemContainer,
        {
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: item.backgroundColor,
        },
      ]}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemDesc}>{item.description}</Text>
    </View>
  )
}

export default BoardingItem

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  itemTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 24,
    textAlign: 'center',
  },
  itemImage: {
    maxWidth: '80%',
    maxHeight: '20%',
    resizeMode: 'contain',
  },
  itemDesc: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 12,
    color: Colors.botticelli['500'],
  },
})
