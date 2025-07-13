import axios from 'redaxios'
import { createFileRoute } from '@tanstack/react-router'
import { queryOptions } from '@tanstack/react-query'

export const Route = createFileRoute('/users')({
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
