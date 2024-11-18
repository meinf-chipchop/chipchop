import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useStorageState } from "@/storage/useStorageState";
import {
  NewUser,
  login,
  logout,
  register,
  getCsrfToken,
  Me,
  me,
} from "@/lib/auth";
import { router } from "expo-router";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<string>;
  signUp: (user: NewUser) => Promise<string>;
  signOut: () => void;
  handleForgotPassword: () => void;
  user?: Me | null;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => "Not implemented",
  signUp: async () => "Not implemented",
  signOut: async () => null,
  handleForgotPassword: () => null,
  user: null,
  session: null,
  isLoading: true,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState<Me | null>(null);

  // Fetch user data when session is set
  useEffect(() => {
    if (session) {
      (async () => {
        try {
          const userData = await me();
          console.log("[SessionProvider] user:", userData);
          setUser(userData);
        } catch (error) {
          console.error("[SessionProvider] Failed to fetch user:", error);
          setUser(null);
        }
      })();
    } else {
      setUser(null); // Clear user if no session
    }
  }, [session]);

  const signIn = async (email: string, password: string): Promise<string> => {
    try {
      const response = await login(email, password);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const errorMessage = error?.Message || "Unknown error occurred.";
        console.error(
          `[signIn] Login failed with status ${response.status}: ${errorMessage}`
        );
        return `Login failed: ${errorMessage}`;
      }

      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        console.error("[signIn] CSRF token missing or invalid.");
        return "Login failed: Unable to retrieve session token.";
      }

      setSession(csrfToken);
      return ""; // Success, no error message
    } catch (error) {
      console.error("[signIn] Unexpected error:", error);
      return `Error: ${
        error instanceof Error ? error.message : "Unknown error occurred."
      }`;
    }
  };

  const signUp = async (user: NewUser): Promise<string> => {
    try {
      const response = await register(user);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const errorMessage = error?.message || "Unknown error occurred.";
        console.error(
          `[signUp] Server responded with status ${response.status}: ${errorMessage}`
        );
        return `Sign up failed: ${errorMessage}`;
      }

      const token = getCsrfToken();
      if (!token) {
        console.error("[signUp] CSRF token missing or invalid.");
      }

      setSession(token ?? "");
      return ""; // Success, no error message
    } catch (error) {
      console.error("[signUp] Unexpected error:", error);
      return `Error: ${
        error instanceof Error ? error.message : "Unknown error occurred."
      }`;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut: async () => {
          const response = await logout();
          if (!response.ok) {
            console.error(
              `[signOut] Failed to log out with status ${response.status}`
            );
          } else {
            setSession(null);
            router.push("/");
          }
        },
        handleForgotPassword: () => null,
        user,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
