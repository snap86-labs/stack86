import { createFileRoute, Outlet } from "@tanstack/react-router"

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  component: () => {
    if (!authClient.) {
      return "Logged out. Please log in to continue."
    }

    return <Outlet />
  },
})