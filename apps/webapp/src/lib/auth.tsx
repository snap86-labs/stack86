import { oneTapClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { createContext, useContext, type ReactNode } from "react";

export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: "722004072582-7rbnamfkm2ojb9v4dnol8ieq9dhoochb.apps.googleusercontent.com",
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      additionalOptions: {},
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5
      }
    })
  ]
});

export interface AppAuthContext {
  authClient: ReturnType<typeof createAuthClient> &  {
  oneTap: (options?: {
    fetchOptions?: {
      onSuccess?: () => void;
    };
    callbackURL?: string;
    onPromptNotification?: (notification: any) => void;
  }) => Promise<void>;
};
}

const AuthContext = createContext<AppAuthContext | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ authClient }}>
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