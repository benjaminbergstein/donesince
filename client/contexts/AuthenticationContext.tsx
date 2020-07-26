import React, { useContext } from 'react'
import createPersistedState from 'use-persisted-state'
import { useMutation } from '@apollo/react-hooks';

import { SIGN_IN } from '../apollo/queries'

// import Message from '../system/Message'
import FlashContext from './FlashContext'

// interface UnsyncedActivitiesRepo {
//   [clientId: string]: RecordActivityInput
// }

const useAuthenticationState = createPersistedState('donesince:auth')

export enum AuthenticationStatus {
  Anonymous = 0,
  SignedIn,
}

interface AuthenticationStorageState {
  apiToken?: string
  status: AuthenticationStatus
}

export interface AuthenticationState {
  signIn: (name: String) => void
  apiToken?: string
  status: AuthenticationStatus
}

export const useAuthentication = () => {
  const [authenticationStorage, setAuthenticationStorage] = useAuthenticationState<AuthenticationStorageState>({
    status: AuthenticationStatus.Anonymous,
  })

  const { addFlash } = useContext(FlashContext)

  const {
    status = AuthenticationStatus.Anonymous,
    apiToken,
  } = authenticationStorage

  const [doSignIn] = useMutation(SIGN_IN, {
    refetchQueries: ['MyActivities', 'MyTrends'],
    onCompleted(data) {
      const { signIn } = data
      const { apiToken } = signIn

      setAuthenticationStorage({
        apiToken,
        status: AuthenticationStatus.SignedIn,
      })
      addFlash("Successfully signed in!")
    }
  })

  const signIn: (name: String) => void = (name) => {
    doSignIn({ variables: { name } })
  }

  const authenticationState: AuthenticationState = {
    signIn,
    status,
    apiToken,
  }

  return authenticationState
}

const AuthenticationContext = React.createContext<AuthenticationState>({
  status: AuthenticationStatus.Anonymous,
  signIn(name) {
    console.log(`Sorry, ${name}, can't sign in yet.`)
  },
})

export const AuthenticationProvider: React.FC<{}> = ({ children }) => {
  const authenticationState: AuthenticationState = useAuthentication()

  return (
    <AuthenticationContext.Provider value={authenticationState}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext
