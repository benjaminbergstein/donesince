import React from 'react'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/react-hooks';

import { ME } from '../../apollo/queries'

import {
  Me_me,
  Me,
} from '../../apollo/types/Me'

type User = Me_me

export interface UserState {
  isAuthenticated: boolean
  name?: string
}

interface MeReturn {
  user: User | undefined
  loading: boolean
}

const useMe: () => MeReturn = () => {
  const { data, loading }: { data: Me | undefined, loading: boolean } = useQuery(ME, {
    fetchPolicy: 'network-only',
  })
  if (loading) return { user: undefined, loading: true }
  if (!data) return { user: undefined, loading: false }

  const { me } = data
  return { user: me, loading: false }
}

interface ProviderProps {
  requireAuthentication: boolean
}

const isServer = typeof window === 'undefined'

export const UserProvider: React.FC<ProviderProps> = ({
  requireAuthentication,
  children
}) => {
  const router = isServer ? undefined : useRouter()
  const { user, loading } = useMe()
  const isAuthenticated = !!user

  if (!isServer && !loading && !isAuthenticated && requireAuthentication) {
    if (router) router.push('/login')
  }

  const userContext: UserState = {
    isAuthenticated,
    name: !!user && isAuthenticated === true ? user.name : undefined,
  }

  return <UserContext.Provider value={userContext}>
    {children}
  </UserContext.Provider>
}

const UserContext = React.createContext<UserState>({
  isAuthenticated: false,
})

export default UserContext
