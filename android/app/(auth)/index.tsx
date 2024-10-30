import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { Images } from '@/constants/Images'
import SignUp from './signup'
import SignIn from './signin'

const AuthForms = () => {
  const [activeTab, setActiveTab] = useState('signup')
  const [signUpType, setSignUpType] = useState('')

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 px-6">
        <View className="relative w-screen flex justify-center items-center">
          <Image
            style={{ width: 100, height: 100 }}
            contentFit="contain"
            source={Images.auth}
          />
          <View className="flex-row justify-center w-full mb-4">
            <TouchableOpacity
              className={`px-4 py-2 ${
                activeTab === 'login' ? 'border-b-2 border-primary-500' : ''
              }`}
              onPress={() => {
                setActiveTab('login')
                setSignUpType('')
              }}
            >
              <Text
                className={`text-lg font-JakartaSemiBold ${
                  activeTab === 'login' ? 'text-primary-500' : 'text-black'
                }`}
              >
                Log In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 ${
                activeTab === 'signup' ? 'border-b-2 border-primary-500' : ''
              }`}
              onPress={() => {
                setActiveTab('signup')
                setSignUpType('')
              }}
            >
              <Text
                className={`text-lg font-JakartaSemiBold ${
                  activeTab === 'signup' ? 'text-primary-500' : 'text-black'
                }`}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {activeTab === 'signup' ? <SignUp /> : <SignIn />}
      </View>
    </ScrollView>
  )
}

export default AuthForms
