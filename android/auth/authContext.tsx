import { useContext, createContext, type PropsWithChildren } from 'react'
import { useStorageState } from './useStorageState'
import { NewUser, login, logout, register } from '@/lib/auth'

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<string>
  signUp: (user: NewUser) => Promise<string>
  signOut: () => void
  handleForgotPassword: () => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: async () => 'Not implemented',
  signUp: async () => 'Not implemented',
  signOut: async () => null,
  handleForgotPassword: () => null,
  session: null,
  isLoading: true,
})

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session')

  const signIn = async (email: string, password: string) => {
    try {
      const response = await login(email, password)
      if (response.ok) {
        return ''
      } else {
        return 'Login failed: ' + response.text
      }
    } catch (error) {
      console.log('Error: ' + error)
      return 'Error: ' + error
    }
  }

  const signUp = async (user: NewUser) => {
    try {
      const response = await register(user)
      if (response.ok) {
        return ''
      } else {
        return 'Sign up failed: ' + response.text
      }
    } catch (error) {
      console.log('Error: ' + error)
      return 'Error: ' + error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut: async () => {
          const response = await logout()
          if (response.ok) setSession(null)
        },
        handleForgotPassword: () => null,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
