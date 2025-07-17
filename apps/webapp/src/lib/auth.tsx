import { createAuthClient } from "better-auth/react";
import { createContext, use, useContext, type ReactNode } from "react";


export interface AuthContext {
  AuthClient: ReturnType<typeof createAuthClient>;
}

const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}