import route from 'next/router'
import firebase from '@/firebase/config'
import { User } from '@/model/User'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface AuthContextProps {
  user?: User
  isLoading?: boolean
  loginGoogle: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

async function normalUser(userFirebase: firebase.User): Promise<User> {
  const token = await userFirebase.getIdToken()

  return {
    uid: userFirebase.uid,
    name: userFirebase.displayName!,
    email: userFirebase.email!,
    token,
    provider: userFirebase.providerData[0]?.providerId!,
    imageUrl: userFirebase.photoURL!
  }
}

function generateCookie(logged: string) {
  if(logged) {
    Cookies.set('admin-template-auth', logged, {
      expires: 7
    })
  } else {
    Cookies.remove('admin-template-auth')
  }
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  async function configSession(userFirebase: firebase.User | null) {
    if(userFirebase?.email) {
      const user = await normalUser(userFirebase)
      setUser(user)
      generateCookie('yes')
      setIsLoading(false)
      return user.email
    } else {
      setUser(undefined)
      generateCookie('')
      setIsLoading(false)
      return false
    }
  }

  async function loginGoogle() {
    try {
      setIsLoading(true)
      const resp = await firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
  
      await configSession(resp.user!)
      route.push('/')
    } finally {
      setIsLoading(false)
    }
    
  }

  async function logout() {
    try {
      await firebase.auth().signOut()
      await configSession(null)
    } finally {
      setIsLoading(false)
    }

  }

  async function login(email: string, password: string) {
    try {
      setIsLoading(true)
      const resp = await firebase.auth().signInWithEmailAndPassword(email, password)
  
      await configSession(resp.user!)
      route.push('/')
    } finally {
      setIsLoading(false)
    }
    
  }

  async function register(email: string, password: string) {
    try {
      setIsLoading(true)
      const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)
  
      await configSession(resp.user!)
      route.push('/')
    } finally {
      setIsLoading(false)
    }
    
  }

  useEffect(() => {
    if (Cookies.get('admin-template-auth')) {
      const cancel = firebase.auth().onIdTokenChanged(configSession)
      return () => cancel()
    } else {
      setIsLoading(false)
    }
    
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      loginGoogle,
      login,
      register,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}


