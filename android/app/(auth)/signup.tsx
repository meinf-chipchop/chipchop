import { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { z } from 'zod'
import InputField from '@/components/InputField'
import { router } from 'expo-router'
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button'
import { Ionicons } from '@expo/vector-icons'
import OAuth from '@/components/Auth'
import { useSession } from '@/auth/authContext'
import { NewUser } from '@/lib/auth'

const signUpValidationSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  birth_date: z
    .string()
    .min(1, 'Date is required')
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Invalid date. Should be in YYYY-MM-DD format'
    ),
})

const CustomerSignUp = () => {
  const [form, setForm] = useState<NewUser>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    birth_date: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const { signUp } = useSession()

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

  const [response, setResponse] = useState({ ok: true, errors: '' })
  const onSignUpPress = async () => {
    if (validateForm()) {
      setLoading(true)
      signUp(form)
        .then((res) => {
          if (res.length === 0) {
            setResponse({ ok: true, errors: '' })
            router.push('/')
          } else setResponse({ ok: false, errors: res })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white mb-10 gap-2">
        <InputField
          label="First Name"
          placeholder="First name"
          leftIcon={<Ionicons name="person" size={14} />}
          value={form.first_name}
          onChangeText={(value: string) =>
            setForm({ ...form, first_name: value })
          }
          error={errors.first_name}
        />
        <InputField
          label="Last Name"
          placeholder="Last name"
          leftIcon={<Ionicons name="person" size={14} />}
          value={form.last_name}
          onChangeText={(value: string) =>
            setForm({ ...form, last_name: value })
          }
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
          label="Phone Number"
          placeholder="Phone number"
          leftIcon={<Ionicons name="call" size={14} />}
          textContentType="telephoneNumber"
          value={form.phone}
          onChangeText={(value: string) => setForm({ ...form, phone: value })}
          error={errors.phone}
        />
        <InputField
          label="Age"
          placeholder="Age"
          leftIcon={<Ionicons name="calendar" size={14} />}
          textContentType="birthdateDay"
          value={form.birth_date}
          onChangeText={(value: string) =>
            setForm({ ...form, birth_date: value })
          }
          error={errors.birth_date}
        />
        <Button
          disabled={loading}
          onPress={onSignUpPress}
          className="rounded-full mt-6"
        >
          {loading && <ButtonSpinner />}
          <ButtonText>Sign up</ButtonText>
        </Button>
        {response.errors.length > 0 && (
          <Text className="color-error-400 text-center font-bold">
            {response.errors}
          </Text>
        )}
        <OAuth />
      </View>
    </ScrollView>
  )
}

export default CustomerSignUp
