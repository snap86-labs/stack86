import axios from 'redaxios'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { queryOptions } from '@tanstack/react-query'

export const Route = createFileRoute('/users')({
  beforeLoad: async ({ context, location }) => {
    const session = await context.authContext.authClient.getSession()
    console.info('Session:', session);
    if (!session.data) {
      console.info('Redirecting to login from /users route');
      context.authContext.authClient.signIn.social({
        provider: "google",
        callbackURL: location.href
      })
    }
  },
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(userQueryOptions),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/users"!</div>
}


export const fetchUsers = async () => {
  console.info('Fetching users...')
  return axios
    .get('/api/users')
    .then((response) => {
      console.info('Fetched users:', response.data)
      return response.data
    })
    .catch((error) => {
      console.error('Error fetching user:', error)
      throw error
    })
}

const userQueryOptions = 
  queryOptions({
  queryKey: ['users'],
    queryFn: fetchUsers,
  })
