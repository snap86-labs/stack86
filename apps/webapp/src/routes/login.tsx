import { createFileRoute, redirect } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import googleLogo from '../assets/google.svg'
import { useAuth } from '../lib/auth'
import {z} from 'zod'

const redirectSearchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/login')({
  validateSearch: zodValidator(redirectSearchSchema),
  beforeLoad: async ({ context, location }) => {
    const session = await context.authContext.authClient.getSession()
    if (session.data) {
      console.info('Redirecting to home from /login route');
      throw redirect({ to: '/' })
    }
  },
  component: LoginRoute,
})

function LoginRoute() {
  const auth = useAuth()
  const {redirect} = Route.useSearch()

  const handleGoogleLogin = () => {
    auth.authClient.signIn.social({
      provider: 'google',
      callbackURL:  window.location.origin + (redirect ? redirect : '/'),
    })
    console.log('Google login clicked')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to SHACN
        </h1>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition"
        >
          <img src={googleLogo} alt="Google" className="w-5 h-5" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  )
}
