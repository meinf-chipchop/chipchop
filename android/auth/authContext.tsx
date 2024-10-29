import { useContext, createContext, type PropsWithChildren } from 'react'
import { useStorageState } from './useStorageState'

const AuthContext = createContext<{
  signIn: (
    email: string,
    password: string,
    action: () => void,
  ) => Promise<boolean>
  signUp: (email: string, password: string) => Promise<Boolean>
  signOut: () => void
  handleForgotPassword: () => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => null,
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

  const signIn = async (
    email: string,
    password: string,
    action: () => void,
  ): Promise<boolean> => {
    // Perform sign-in logic here
    return new Promise((resolve, reject) => {
      try {
        setSession(email + password)
        action()
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  }
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp: (email: string, password: string) => {
          return new Promise(() => { })
        },
        signOut: () => {
          setSession(null)
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
