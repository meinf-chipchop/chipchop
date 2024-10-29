import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import InputField from '@/components/InputField'
import { Ionicons } from '@expo/vector-icons'
import CButton from '@/components/StyledButton'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const onSignInPress = async () => {}
  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white">
        <View className="gap-4">
          <InputField
            containerStyle="bg-background-50"
            placeholder="Enter email"
            leftIcon={<Ionicons name="mail" size={16} />}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value: any) => setForm({ ...form, email: value })}
          />
          <InputField
            containerStyle="bg-background-50"
            placeholder="Enter password"
            leftIcon={<Ionicons name="lock-closed" size={16} />}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value: any) => setForm({ ...form, password: value })}
          />
          <Text className="text-sm text-right font-JakartaSemiBold text-primary-500 my-2">
            Forgot Password?
          </Text>
          <CButton label="Sign In" onPress={onSignInPress} className="mt-2" />
        </View>
      </View>
    </ScrollView>
  )
}
export default SignIn
