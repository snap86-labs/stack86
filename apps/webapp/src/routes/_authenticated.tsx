import { createFileRoute, Outlet } from "@tanstack/react-router"

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  component: () => {
    // TODO: Add proper authentication check
    // const { authClient } = useAuth()
    // if (!authClient.data?.user) {
    //   return "Logged out. Please log in to continue."
    // }

    return <Outlet />
  },
})