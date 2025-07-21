import { createFileRoute } from '@tanstack/react-router'
import { Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'


export const Route = createFileRoute('/_auth')({
    beforeLoad: async ({ location }) => {
        const session = await authClient.getSession()
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
    return (<>
        <Outlet />
    </>
    )
}