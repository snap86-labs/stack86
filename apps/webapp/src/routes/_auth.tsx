import { createFileRoute } from '@tanstack/react-router'
import { Outlet, redirect, useRouter } from '@tanstack/react-router'
import { useAuth } from '../lib/auth'


export const Route = createFileRoute('/_auth')({
    beforeLoad: async ({ context, location }) => {
        const session = await context.authContext.authClient.getSession()
        if (!session.data) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
    component: AuthLayout,
})

function AuthLayout() {
    const router = useRouter()
    const navigate = Route.useNavigate()
    const auth = useAuth()

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            await auth.authClient.signOut()
            await router.invalidate().finally(() => {
                navigate({ to: '/' })
            })
        }
    }

    return (<>
        <button
            type="button"
            className="hover:underline"
            onClick={handleLogout}
        >
            Logout
        </button>
        <Outlet />
    </>
    )
}