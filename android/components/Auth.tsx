import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { icons } from '@/constants/Icons'
import { Button } from './ui/button'

const OAuth = () => {
  const handleGoogleSignIn = async () => {}

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <View className="flex flex-row justify-center items-center mt-5 space-x-4">
        <Button
          variant="link"
          className="w-12 h-12"
          onPress={handleGoogleSignIn}
        >
          <Image
            source={icons.google}
            resizeMode="contain"
            style={styles.icon}
            className="mx-2"
          />
        </Button>
        <Button
          variant="link"
          className="w-12 h-12"
          onPress={handleGoogleSignIn}
        >
          <Image
            source={icons.facebook}
            style={styles.icon}
            resizeMode="contain"
            className="mx-2"
          />
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: Platform.OS === 'web' ? 24 : 'auto',
    width: Platform.OS === 'web' ? 24 : 'auto',
  },
})

export default OAuth
