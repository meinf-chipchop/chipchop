import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { z } from 'zod'
import InputField from '@/components/InputField'
import { router } from 'expo-router'
import { Button, ButtonText } from '@/components/ui/button'
import { Ionicons } from '@expo/vector-icons'
import OAuth from '@/components/Auth'

const signUpValidationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  address: z.string().min(1, 'Address is required'),
})

const CustomerSignUp = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    try {
      setErrors({})
      signUpValidationSchema.parse(form)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const onSignUpPress = async () => {
    if (validateForm()) {
      // Proceed with sign up logic
      router.push('/(root)/(tabs)/home' as any)
    }
  }

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white mb-10 gap-2">
        <InputField
          label="Full Name"
          placeholder="Full name"
          leftIcon={<Ionicons name="person" size={14} />}
          value={form.fullName}
          onChangeText={(value: string) =>
            setForm({ ...form, fullName: value })
          }
          error={errors.fullName}
        />
        <InputField
          label="Email"
          placeholder="Email"
          leftIcon={<Ionicons name="mail" size={14} />}
          textContentType="emailAddress"
          value={form.email}
          onChangeText={(value: string) => setForm({ ...form, email: value })}
          error={errors.email}
        />
        <InputField
          label="Password"
          placeholder="Password"
          leftIcon={<Ionicons name="lock-closed" size={14} />}
          secureTextEntry={true}
          textContentType="password"
          value={form.password}
          onChangeText={(value: string) =>
            setForm({ ...form, password: value })
          }
          error={errors.password}
        />
        <InputField
          label="Address"
          placeholder="Address"
          leftIcon={<Ionicons name="location" size={14} />}
          value={form.address}
          onChangeText={(value: string) => setForm({ ...form, address: value })}
          error={errors.address}
        />
        <InputField
          label="Phone Number"
          placeholder="Phone number"
          leftIcon={<Ionicons name="call" size={14} />}
          textContentType="telephoneNumber"
          value={form.phoneNumber}
          onChangeText={(value: string) =>
            setForm({ ...form, phoneNumber: value })
          }
          error={errors.phoneNumber}
        />
        <Button onPress={onSignUpPress} className="rounded-full mt-6">
          <ButtonText>Sign up</ButtonText>
        </Button>
        <OAuth />
      </View>
    </ScrollView>
  )
}

export default CustomerSignUp
