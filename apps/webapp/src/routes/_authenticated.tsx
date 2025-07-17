import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useAuth } from "../lib/auth"

export const Route = createFileRoute('/_authenticated')({
  component: () => {
    const { authClient } = useAuth()
    const session = authClient.getSession()
    if (!session) {
      authClient.oneTap?.()
    }

    return <Outlet />
  },
})