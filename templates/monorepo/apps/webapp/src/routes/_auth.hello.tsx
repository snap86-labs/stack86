import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/hello')({
  component: RouteComponent,
})

function RouteComponent() {
  return (    <section className="grid gap-2 p-2">
      <p>You are currently on the _auth route.</p>
    </section>
)
}
