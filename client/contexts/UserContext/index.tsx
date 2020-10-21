import React from 'react'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/react-hooks';

import { ME } from '../../apollo/queries'

import {
  Me_me,
  Me,
} from '../../apollo/types/Me'

const User = Me_me

export interface UserState {
  isAuthenticated: boolean
  name?: string
  storeApiToken: (apiToken: string) => void
}

interface MeReturn {
  user: User | undefined
  loading: boolean
  refetch: () => void
}

const useMe: () => MeReturn = () => {
  const { data, loading, refetch }: { data: Me } = useQuery(ME, {
    fetchPolicy: 'network-only',
  })
  if (loading) return { user: undefined, loading: true, refetch }
  if (!data) return { user: undefined, loading: false, refetch }

  const { me } = data
  return { user: me, loading: false, refetch }
}

interface ProviderProps {
  requireAuthentication: boolean
}

export const UserProvider: React.FC<ProviderProps> = ({
  requireAuthentication,
  children
}) => {
  const router = useRouter()
  const { user, loading, refetch } = useMe()
  const isAuthenticated = !!user

  if (!loading && !isAuthenticated && requireAuthentication) {
    router.push('/login')
  }

  const userContext = {
    isAuthenticated,
    name: isAuthenticated === true ? user.name : undefined,
    storeApiToken: (apiToken) => {
      window.localStorage.setItem('donesince__apiToken', apiToken)
      refetch()
    },
  }

  return <UserContext.Provider value={userContext}>
    {children}
  </UserContext.Provider>
}

const UserContext = React.createContext<UserState>({
  isAuthenticated: false,
  storeApiToken: (apiToken) => {}
})

export default UserContext
