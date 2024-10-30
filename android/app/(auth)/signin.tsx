import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import InputField from '@/components/InputField'
import { Ionicons } from '@expo/vector-icons'
import { Button, ButtonText } from '@/components/ui/button'
import { z } from 'zod'
import { useSession } from '@/auth/authContext'
import OAuth from '@/components/Auth'
import { router } from 'expo-router'

const signInValidationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const { signIn } = useSession()

  const [errors, setErrors] = useState({ email: '', password: '' })

  const validateForm = () => {
    try {
      setErrors({ email: '', password: '' })
      signInValidationSchema.parse(form)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = { email: '', password: '' }
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') newErrors.email = err.message
          else if (err.path[0] === 'password') newErrors.password = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const onSignInPress = async () => {
    if (validateForm()) {
      signIn(form.email, form.password, () => {
        router.push('/modal')
      })
      // Proceed with sign up logic
    } else {
      console.log(errors)
    }
  }
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
            error={errors.email}
          />
          <InputField
            containerStyle="bg-background-50"
            placeholder="Enter password"
            leftIcon={<Ionicons name="lock-closed" size={16} />}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value: any) => setForm({ ...form, password: value })}
            error={errors.password}
          />
          <Text className="text-sm text-right font-JakartaSemiBold text-primary-500 my-2">
            Forgot Password?
          </Text>
          <Button onPress={onSignInPress} className="mt-6 rounded-full">
            <ButtonText>Sign in</ButtonText>
          </Button>
          <OAuth />
        </View>
      </View>
    </ScrollView>
  )
}
export default SignIn
