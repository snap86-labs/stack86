import { createFileRoute } from '@tanstack/react-router'
import { queryOptions } from '@tanstack/react-query'
import { honoClient } from '../lib/hono';


export const Route = createFileRoute('/_auth/users')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(userQueryOptions),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/users"!</div>
}


export const fetchUsers = async () => {
  console.info('Fetching users...')
  // Assuming honoClient has a users endpoint, e.g. honoClient.users.get()
  // Replace 'users' with the actual endpoint if different
  const response = await honoClient.api.users.$get();
  return response;
}

const userQueryOptions = 
  queryOptions({
  queryKey: ['users'],
    queryFn: fetchUsers,
  })
