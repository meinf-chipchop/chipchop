import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { icons } from '@/constants/Icons'
import { Button } from './ui/button'
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin'
import { useState } from 'react'

const OAuth = () => {
  const [state, setState] = useState({ userInfo: null as User | null })

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        setState({ userInfo: response.data })
      } else {
        console.log('Canceled by user')
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            console.log('IN_PROGRESS')
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('PLAY_SERVICES_NOT_AVAILABLE')
            // Android only, play services not available or outdated
            break
          default:
            // some other error happened
            console.log('default' + error.message)
        }
      } else {
        // an error that's not related to google sign in occurred
        console.log('unknown' + error)
      }
    }
  }

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true,
  })
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
