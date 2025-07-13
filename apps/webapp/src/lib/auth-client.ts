import { createAuthClient } from "better-auth/react"
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: "722004072582-7rbnamfkm2ojb9v4dnol8ieq9dhoochb.apps.googleusercontent.com",
      // Optional client configuration:
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      additionalOptions: {
        // Any extra options for the Google initialize method
        
      },
      // Configure prompt behavior and exponential backoff:
      promptOptions: {
        baseDelay: 1000,   // Base delay in ms (default: 1000)
        maxAttempts: 5     // Maximum number of attempts before triggering onPromptNotification (default: 5)
      }
    })
  ]
})